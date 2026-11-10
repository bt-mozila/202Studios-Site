import AnchorLink from './AnchorLink.jsx'

export default function Footer({ onOpenLegal }) {
  const open = (which) => (e) => {
    e.preventDefault()
    onOpenLegal(which)
  }

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i> <AnchorLink id="services">Services</AnchorLink>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{' '}
                  <a href="#" role="button" onClick={open('terms')}>Terms of service</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{' '}
                  <a href="#" role="button" onClick={open('privacy')}>Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-6 col-lg-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <a>Electronics Repairs (Board Level)</a></li>
                <li><i className="bx bx-chevron-right"></i> <a>Web Design &amp; Development</a></li>
                <li><i className="bx bx-chevron-right"></i> <a>Web Hosting</a></li>
              </ul>
            </div>

            <div className="col-12 col-md-6 col-lg-3 footer-contact">
              <h4>Contact Us</h4>
              <strong>Phone:</strong> +267 73 660 486<br />
              <strong>Email:</strong> info@202studios.co.bw<br />
              <strong>Location:</strong> Gaborone | Botswana<br />
            </div>

            <div className="col-12 col-md-6 col-lg-3 footer-info">
              <h3>About 202Studios</h3>
              <p>
                202Studios delivers expert board-level electronics repairs, custom web design &amp; development, and reliable web hosting to power your digital growth.
              </p>
              <div className="social-links mt-3">
                <a href="https://www.facebook.com/profile.php?id=61567712486891" className="facebook" target="_blank" rel="noopener noreferrer"><i className="bx bxl-facebook"></i></a>
                <a href="https://www.tiktok.com/@202_studios" className="tiktok" target="_blank" rel="noopener noreferrer"><i className="bx bxl-tiktok"></i></a>
                <a href="https://wa.me/26773660486" className="whatsapp" target="_blank" rel="noopener noreferrer"><i className="bx bxl-whatsapp"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>202Studios</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          <a>Designed by 202Studios</a>
        </div>
      </div>
    </footer>
  )
}
