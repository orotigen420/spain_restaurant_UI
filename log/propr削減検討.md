# ButtonコンポーネントのProps削減・整理の検討

## 1. 現状のPropsと課題
現在、[Button/index.tsx](file:///home/orotigen/website/spain_restaurant_UI/src/component/uiparts/Button/index.tsx) で定義されているPropsは合計9個あり、コンポーネントの記述が肥大化しています。

### 現状のProps一覧:
- `variant` (CTA/Secondaryの見た目)
- `text` (テキスト)
- `icon` (アイコンコンポーネント)
- `iconPosition` (アイコンの左右配置)
- `size` (サイズ)
- `layoutClass` (外部からのCSS追加)
- `onClick` (クリックハンドラ)
- `to` (ルーティング遷移先)
- `ariaLabel` (アクセシビリティ読み上げ用)

### 課題点:
1. `onClick` や `ariaLabel` など、標準のHTML属性やReact Routerの属性を1つずつ手動で定義し、内部でマッピングしているためProps定義が増えている。
2. 将来的に `disabled` や `type="submit"` など、他の標準的なHTML属性を使いたくなった際、その都度Propsの追加とJSX側へのマッピング修正が必要になり、拡張性が低い。
3. 外部からスタイルを追加するためのプロパティ名として、一般的な `className` ではなく `layoutClass` という独自の名称が使われている。

---

## 2. ReactにおけるProps設計のベストプラクティス
モダンなReact/TypeScriptプロジェクト（shadcn/ui、Chakra UIなど）では、以下の設計アプローチが一般的です。

### 1) 標準HTML属性およびライブラリコンポーネントのPropsを継承（パススルー）する
TypeScriptの `ComponentPropsWithoutRef` を使い、`<button>` タグや `<Link>` コンポーネントが元々持っている標準のプロパティ群（`onClick`、`aria-label`、`disabled` など）を丸ごと継承します。
これらをJSX側でスプレッド構文（`...props`）を用いて一括で流し込むことで、手動でのマッピングコードをすべて排除できます。

### 2) `children` を活用してテキストやアイコンを柔軟に受け取る
`text` や `icon` を個別のPropsにする代わりに、`<Button>テキスト <Icon /></Button>` のように `children` を介して渡すことで、コンポーネント独自のPropsを大幅に減らせます。

---

## 3. 具体的な改善案

### 案1: 標準属性のパススルー化＋ `className` への統一（推奨・下位互換性重視）
既存の `text` や `icon` による表示制御（`iconPosition` によるミリ単位の余白調整など）はそのまま活かしたまま、機能的なPropsだけをパススルー（一括転送）化してPropsを整理します。

#### 改善後の `CtaButtonProps` 定義
```typescript
import { type ReactNode, type ComponentType, type ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router';

// button と Link の標準属性（onClick, disabled, aria-label, type 等）をマージしたベース型
type LinkAndButtonProps = ComponentPropsWithoutRef<'button'> & ComponentPropsWithoutRef<typeof Link>;

interface CtaButtonProps extends LinkAndButtonProps {
    /** ボタンの見た目バリアント（メインの黄色グラデーション / 二次アクション用） */
    variant: 'cta' | 'secondary';
    /** ボタンに表示するテキスト */
    text: string;
    /** 表示するアイコン */
    icon?: ComponentType<{ className?: string }>;
    /** アイコンとテキストの配置順（デフォルト: right） */
    iconPosition?: 'left' | 'right';
    /** ボタンのサイズ（デフォルト: lg） */
    size?: 'sm' | 'md' | 'lg';
    // ※ className, onClick, aria-label などは自動的に継承されるため、ここでの明示的定義は不要
}
```

#### 改善後の JSX 実装
```tsx
function CtaButton({
    variant,
    text,
    icon: Icon,
    iconPosition = 'right',
    size = 'lg',
    className = '', // layoutClass から標準の className に変更
    to,
    ...props // onClick, aria-label などの標準属性を一括で回収
}: CtaButtonProps) {
    const buttonClassName = `${styles.button} ${className} ${styles[variant]} ${styles[size]}`.trim();
    
    const content = (
        <>
            {Icon && iconPosition === 'left' && <Icon className={styles.icon} />}
            <span className={styles.word}>{text}</span>
            {Icon && iconPosition === 'right' && <Icon className={styles.icon} />}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={buttonClassName} data-icon-position={iconPosition} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button className={buttonClassName} data-icon-position={iconPosition} {...props}>
            {content}
        </button>
    );
}
```

### 案2: `children` スタイルへの完全移行（最もシンプルで柔軟）
`text` や `icon` などの表示用Propsもすべて排除し、タグの中に要素を直接配置するスタイルです。Propsを最小限（`variant`、`size` のみ）に抑えることができますが、呼び出し側の記述が少し変更になります。

#### 改善後の JSX 実装
```tsx
interface CtaButtonProps extends LinkAndButtonProps {
    variant: 'cta' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
}

function CtaButton({ variant, size = 'lg', className = '', to, children, ...props }: CtaButtonProps) {
    const buttonClassName = `${styles.button} ${className} ${styles[variant]} ${styles[size]}`.trim();
    return to ? (
        <Link to={to} className={buttonClassName} {...props}>{children}</Link>
    ) : (
        <button className={buttonClassName} {...props}>{children}</button>
    );
}
```

---

## 4. 今後の進め方について
- **「案1」を採用する場合**: 
  1. [Button/index.tsx](file:///home/orotigen/website/spain_restaurant_UI/src/component/uiparts/Button/index.tsx) の Props 定義と実装をリファクタリング。
  2. `layoutClass` を使っている呼び出し元のファイル（`FirstView` や `SelectGuestNumber` 等）で、Props 名を `className` に書き換える。
- **「案2」を採用する場合**:
  1. `Button` の中身を `children` で描画するように修正。
  2. 呼び出し元のボタンを `<Button ...>テキスト <Icon /></Button>` のように書き換える。
