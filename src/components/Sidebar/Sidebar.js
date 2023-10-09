import React from 'react'
import './Sidebar.css'

function Sidebar() {
  return (
    <section className='side-bar'>
    <div className="links">
    <a style={{textDecoration: 'none'}} href="/subscription"><div className="group" style={{justifyContent: 'space-evenly', width: '100px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '5px'}}>1,000 <img src="/icons/buy.svg" style={{width: '18px', height: '18px'}} /> <img title="Credits Left" src="/icons/question-mark.svg" style={{width: '16px', height: '16px'}} /></div></a>
      <a style={{textDecoration: 'none'}} href="/"><div className="group"><img src="/icons/home.svg" style={{width: '24px', height: '24px'}} />Home</div></a>
      <a style={{textDecoration: 'none'}} href="/puzzles"><div className="group"><img src="/icons/puzzle.svg" style={{width: '24px', height: '24px'}} />Puzzles</div></a>
      <a style={{textDecoration: 'none'}} href="/chat"><div className="group"><img src="/icons/chat.svg" style={{width: '24px', height: '24px'}} />Chat</div></a>
      <a style={{textDecoration: 'none'}} href="/insight"><div className="group"><img src="/icons/insight.svg" style={{width: '24px', height: '24px'}} />AI Insight</div></a>
      <a style={{textDecoration: 'none'}} href="/dashboard"><div className="group"><img src="/icons/dashboard.svg" style={{width: '24px', height: '24px'}} />Dashboard</div></a>
      <a style={{textDecoration: 'none'}} href="/user-profile"><div className="group"><img src="/icons/profile.svg" style={{width: '24px', height: '24px'}} />Profile</div></a>
      {/* <a style={{textDecoration: 'none'}} href="/"><div className="group"><img src="" style={{width: '24px', height: '24px'}} />Settings</div></a> */}
      <a style={{textDecoration: 'none'}} href="/"><div className="group"><img src="/icons/logout.svg" style={{width: '24px', height: '24px'}} />Logout</div></a>
      
    </div>
        {/* list categories */}

        {/* useful links based on the convo the ai fills this section with helpful links */}
        {/* badges, ranks, levels */}
{/*      

       <div className="search-and-avatar">
            <div className="visible-avatar">
              <Select
                options={roles}
                onChange={handleRoleChange}
                placeholder="Role"
              />
              <img
                className="chat-avatar"
                src={avatarUrl}
                onClick={handleNewAvatar}
                alt="Chat Avatar"
              />
            </div>
          
            <div className="sidebar-search-container">
                <input
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  value={sidebarSearch}
                  placeholder="Chat History"
                  type="text"
                  className="sidebar-input"
                />
                <button
                  className="sidebar-search-btn"
                  onClick={sidebarSearchClicked}
                  type="submit"
                >
                  🔎
                </button>
              </div>
              </div> */}
            {/* <div className="chat-history" >
              {showModal && (
                <Modal
                  convoObject={selectedConvo}
                  summaryOfConvos={summaryOfConvos}
                  onClose={() => setShowModal(false)}
                />
              )}
              
              
              {chatHistory?.map((convoObject, index) => (
                <div
                  key={index}
                  className="chat-history-item"
                  onClick={() => viewFullConversation(convoObject)}
                >
                  <Typewriter
                    options={{
                      strings: [`☞ ${summaryOfConvos.title}` || 'Previous chat'],
                      autoStart: true,
                      loop: false,
                      deleteSpeed: 9999999,
                      delay: 20,
                    }}
                  />
                </div>
              ))}
            </div> */}
    

      </section>
  )
}

export default Sidebar