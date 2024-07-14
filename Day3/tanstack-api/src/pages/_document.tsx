import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="ko">
      <Head>{/* 여기에 글로벌 스타일 또는 메타 태그를 추가합니다 */}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
