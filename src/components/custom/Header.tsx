import { useUserDetailStore } from '@/store/userDetailsStore'
import React from 'react'

function Header() {

    const {userInfo} = useUserDetailStore()
  return (
    <div>Header

      {JSON.stringify(userInfo)}
    </div>

  )
}

export default Header