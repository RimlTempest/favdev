import { AppSvgIcon } from '@features/ui/footer/components';

export const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <AppSvgIcon />
        <p>Copyright © 2023 Daiki Takahashi.</p>
      </div>
      <div>
        <span className="footer-title">アプリケーション</span>
        <a className="link link-hover">一覧</a>
        <a className="link link-hover">ランキング</a>
        <a className="link link-hover">お問い合わせ</a>
      </div>
      <div>
        <span className="footer-title">規約</span>
        <a className="link link-hover">利用規約</a>
        <a className="link link-hover">プライバシーポリシー</a>
        <a className="link link-hover">Cookieポリシー</a>
      </div>
      <div>
        <span className="footer-title">作者</span>
        <a className="link link-hover">Twitter</a>
      </div>
    </footer>
  );
};
