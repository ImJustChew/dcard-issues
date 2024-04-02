# Dcard 2024 Frontend Intern Homework

[Details](https://drive.google.com/file/d/1x5l_hC5c26MauhTpACwGaa2nBUDo5uad/view) | [Live Demo](https://dcardblog.imjustchew.com/)

>`.env.local` file is required for the project to run. Please refer to `.env.example` for the required environment variables.

To start the project, run `npm install` and `npm run dev` in the terminal.

> Note that the project will use Turbopack for dev server. Please remove the flag `--turbo` in `package.json` if you want to use the default dev server.

## Required Features
- [x] Github OAuth 登入
- [x] 有著作權的使用者可以新增、編輯、刪除文章
- [x] 所有使用者可以瀏覽所有文章
- [x] 主頁有 Pagination, 一頁顯示 10 筆文章
- [x] 文章頁面有文章內容、編輯、刪除功能
- [x] 新增、編輯文章時有驗證機制

## Extra Features
- [x] 全面使用 Typescript
- [x] 使用 Next.js + App Router + Server Components + Server Actions
- [x] Web Vitals 和 Lighthouse 100 分
- [x] 每一頁有自己的 Skeleton Loading
- [x] 有 Error Boundaries
- [x] 支持 Light/Dark Mode
- [x] editor 是 WYSIWYG
- [x] 文章頁面有 SEO Open Graph 支持

## Known Issues / Improvements
- Missing Loaders for posting progress
- Misisng Icons/Fvaicon and Robots.txt file
- Access Token refreshing
- User Profile Filtering
- Loading Skeleton from main page -> post/[issueId] sometimes will fail (App Router issue)
