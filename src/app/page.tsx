export default function Home() {
  return (
    <div>
      <div className='container mx-auto flex justify-end'>
        <div className='details w-fit mt-16'>
          <div className='about backlit'>
            <p className='about-header'>BRAEDEN_HALL</p>
            <p className='about-subheader'>SOFTWARE_DEVELOPER</p>
            <p className='about-subheader'>DREAMER</p>
          </div>
          <div className='contact pt-4 backlit'>
            <p>email &nbsp; = braeden@brhall.dev</p>
            <p>github &nbsp;= &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; broskicodes</p>
            <p>twitter = &nbsp;&nbsp;&nbsp;&nbsp; _broskitweets</p>
          </div>
        </div>
      </div>
      <div className="terminal mx-auto mt-4">
        <div className="terminal-overlay" />
          <div className="terminal-content terminal-text flex justify-center pt-8 backlit">
            Coming Soon.
          </div>
      </div>
      <div className='footer'>
        <div className='py-4 text-black'>
          hello
        </div>
      </div>
    </div>
  )
}
