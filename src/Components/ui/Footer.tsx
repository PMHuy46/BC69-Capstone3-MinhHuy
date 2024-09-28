export const Footer = () => {
  return (
    <div>
      <div >
        <div className="grid grid-cols-4  bg-blue-900 text-white py-[30px] px-10">
            <div>
              <h5>ARCHIVES</h5>
              <ul>
                <li>
                  <i className="fa-solid fa-angles-right " />
                  <span>April 2021</span>
                </li>
              </ul>
            </div>
            <div >
              <h5>CATEGORIES</h5>
              <ul>
                <li>
                  <i className="fa-solid fa-angles-right" />
                  <span>Business</span>
                </li>
                <li>
                  <i className="fa-solid fa-angles-right" />
                  <span>Creative</span>
                </li>
                <li>
                  <i className="fa-solid fa-angles-right" />
                  <span>Design</span>
                </li>
                <li>
                  <i className="fa-solid fa-angles-right" />
                  <span>Food</span>
                </li>
                <li>
                  <i className="fa-solid fa-angles-right" />
                  <span>Industry</span>
                </li>
              </ul>
            </div>
            <div >
              <h5>CONTACT</h5>
              <ul>
                <li>
                  <i className="fa-regular fa-envelope" />
                  <a href="mailto:info@example.com">info@example.com</a>
                </li>
                <li>
                  <i className="fa-solid fa-phone" />
                  <a href="tel:+44-000-888-999">+44-000-888-999</a>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot" />
                  <a href="#"> London, 235 Terry, 10001</a>
                </li>
              </ul>
            </div>
            <div >
              <h5>ABOUT</h5>
              <p className="text-justify">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab.
              </p>
              <i className="fa-brands fa-facebook-f" />
              <i className="fa-brands fa-linkedin-in" />
              <i className="fa-brands fa-twitter" />
              <i className="fa-brands fa-google-plus-g" />
              <i className="fa-brands fa-github" />
            </div>
        </div>
      </div>
      <div className="copyright p-2" style={{ backgroundColor: "#040A17" }}>
        <div className="text-center">
          <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.696)" }}>
            © 2024 Movie. All Rights Reserved | WordPress Theme by myself
          </p>
        </div>
      </div>
    </div>
  );
};
