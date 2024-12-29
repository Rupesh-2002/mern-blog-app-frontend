import React, { useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Articles from '../home/container/Articles'
import Search from '../../components/Search'

const ArticlesPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("")
  return (
    <MainLayout>
        <Search className="py-2 px-4 max-w-6xl mx-auto" onSearch={setSearchKeyword}/>
        <Articles searchKeyword={searchKeyword} />
    </MainLayout>
  )
}

export default ArticlesPage
