import React from 'react'
import './Footer.css'

function Footer() {

    const openInNewTab = async (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if(newWindow) newWindow.opener = null
      }
  
      
  return (
    <footer>
        
    <div className="footer-content">
      <div><h3>Educaiter</h3><p style={{cursor: 'pointer'}} onClick={() => openInNewTab('/about')}>About</p><p style={{cursor: 'pointer', display: 'none'}} onClick={() => openInNewTab('/blog')}>Blog</p></div>
      <div><h3>Help & Support</h3><p style={{cursor: 'pointer'}} onClick={() => openInNewTab('/contact')}>Contact</p></div>
      <div><h3>Socials</h3><p style={{cursor: 'pointer'}} onClick={() => openInNewTab('https://twitter.com/EducaiterAI')}>X</p></div>
      <div><h3>Legal</h3><p style={{cursor: 'pointer'}} onClick={() => openInNewTab('/terms')}>Terms of service</p><p style={{cursor: 'pointer'}} onClick={() => openInNewTab('/privacy')}>Privacy policy</p><p style={{cursor: 'pointer'}} onClick={() => openInNewTab('/cookies')}>Cookies policy</p></div>
    </div>
    <p className="paragraph">Copyright © 2023 Educaiter</p>
  </footer>
  )
}

export default Footer