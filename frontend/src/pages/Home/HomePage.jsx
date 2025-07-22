import Banner from '../../components/Home/Banner'
import Content from '../../components/Home/Content'
import { Helmet } from 'react-helmet'

function HomePage() {

  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="" />
      </Helmet>
      <Banner />
      <Content />
    </>
  )
}

export default HomePage
