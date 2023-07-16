const MailStyle = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  background: #fafafa;
}
.img-logo {
  width: 180px;
  margin: auto;
}
.tbl-bordered {
  border: 1px solid #ddd;
  width: 800px;
  margin: 20px auto;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
}
tr {
  border: 1px solid #ddd;
}
th {
  display: block;
}
th,
h3 {
  padding: 10px 0;
}
td {
  padding: 10px;
  line-height: 1.7em;
}
.bg-expo {
  background: linear-gradient(to right, #BB0A01, #40559B);
  color: #fff;
}
.btn-a {
  color: #fff !important;
    padding: 12px 30px 12px 30px;
    background: linear-gradient(to right, #BB0A01, #40559B);
    border-radius: 10px;
    width: 100px;
}

.btn-primary-contained {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  font-size: 20px;
  text-align: center;
  font-weight: 500;
  border: none;
  outline: none;
  text-decoration: none;
  display: inline-block;
  margin: 5px 0;
}
.link {
  text-decoration: none;
}
.icon-link {
  display: inline-flex;
  align-items: center;
  gap: 1em;
}
.icon-margin-right {
  margin-right: 10px;
}
.social-icon {
  margin: 0.5em 0.2em !important;
  cursor: pointer !important;
}
a {
  text-decoration: none;
}
@media only screen and (max-width: 600px) {
  table {
    width: 100% !important;
  }
  tr td {
    width: 100% !important;
    display: block !important;
  }
}
`;

const bookingMailStyle = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
.tbl-bordered {
  border: 1px solid #ddd;
  width: 800px;
  margin: 20px auto;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  background-color: whitesmoke !important;
}
td,
th {
  padding: 1em;
}
tr {
  border: 1px solid #ddd;
  line-height: 1.6em;
}
ul.square {
  list-style: square;
  line-height: 1.6em;
  margin-left: 1em;
}
.manage-app-btn {
  background-color: #fcce19;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.2em;
  font-size: 1.1em;
  padding: 0.7em !important;
  float: center !important;
  margin: 1em 0 !important;
}
.item-center {
  width: 100%;
  text-align: center;
  padding: 0.5em 0 !important;
}
.color-red {
  color: red;
}
.font-bold {
  font-weight: bold;
}
.margin-tb {
  margin-top: 1em;
  margin-bottom: 1em;
}

.icon-link {
  display: flex;
  align-items: center;
}
.icon-margin-right {
  margin-right: 10px;
  align-self: center !important;
}
.social-icon {
  margin: 0.5em 0.2em !important;
  cursor: pointer !important;
}
a {
  text-decoration: none;
}

@media only screen and (max-width: 600px) {
  table {
    width: 100% !important;
  }
  tr td {
    width: 100% !important;
    display: block !important;
  }
}
td {
  column-span: 100% !important;
  align-items: center !important;
}
only-margin{
  margin: 5px; !important;
}

`;

const tableHead = `
 <tr>
        <td align="center" colspan="100%">
          <img
            src="https://www.PMAY.com/_next/static/media/go_live_nav_logo.172468d3.png"
            class="img-logo"
            alt=""
          />
        </td>
      </tr>`;

const tableFooter = `
<tr>
        <td align="left" class="icon-link">
          <img src="https://yardhotel-api.herokuapp.com/assets/mail-icon.png" height='20px' alt="" class="icon-margin-right">
        <a href = "mailto: support@golive.com">support@golive.com</a>
      </td>
        <td >
          <div class='icon-link'>
            <img src="https://yardhotel-api.herokuapp.com/assets/website-icon.png" height='20px' alt="" class="icon-margin-right">
           <a href = "https://www.PMAY.com/feature" target="_blank">www.PMAY.com</a>
          </div>
          </td>
         
      </tr>
      <tr>
         <td colspan="100%" align="center">
           <div>
             <b>Follow us on social media</b>
           </div>
           <div>
             <a href="https://www.PMAY.com/feature" target="_blank">
              <img src="https://yardhotel-api.herokuapp.com/assets/twitter-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.PMAY.com/feature" target="_blank">
              <img src="https://yardhotel-api.herokuapp.com/assets/pinterest-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.PMAY.com/feature" target="_blank" >
               <img src="https://yardhotel-api.herokuapp.com/assets/tumblr-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href=https://www.PMAY.com/feature" target="_blank">
                <img src='https://yardhotel-api.herokuapp.com/assets/fbIcon.png' height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.PMAY.com/feature" target="_blank">
                 <img src="https://yardhotel-api.herokuapp.com/assets/linked-in-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.PMAY.com/feature" target="_blank" >
                  <img src="https://yardhotel-api.herokuapp.com/assets/instagram-icon.png" height='25px' alt="" class="social-icon">
             </a>
           </div>
          </td>
      </tr>`;

module.exports = {
  normalMailBody: (content: string) => `
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tbody>
      <tr>
        <td align="left" valign="top">
          <table
            align="left"
            bgcolor="#FFFFFF"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="width: 650px"
            width="650"
          >
            <tbody>
              <tr>
                <td align="center" style="padding: 0px 25px" valign="top">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-family: 'inter', helvetica, sans-serif;
                            font-size: 14px;
                            line-height: 20px;
                            color: #000000;
                            font-weight: 400;
                          "
                          valign="top"
                        >
                          Hi Dear, <br />
                          Welcome!<br /><br />
                          ${content}
                          <br />
                        </td>
                      </tr>

                    


                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td align="left" valign="top">
          <table
            align="left"
            bgcolor="#FFFFFF"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="width: 650px"
            width="650"
          >
            <tbody>
              <tr>
                <td align="center" style="padding: 0px 25px" valign="top">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-family: 'inter', helvetica, sans-serif;
                            font-size: 12px;
                            line-height: 19px;
                            font-weight: 500;
                          "
                          valign="top"
                        >
                          <br />
                          <hr />
                          <br />
                          Regards <br />
                          <strong>Team Political</strong> <br />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  `,

  linkEmail: (message: string, link: string) => `
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tbody>
      <tr>
        <td align="left" valign="top">
          <table
            align="left"
            bgcolor="#FFFFFF"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="width: 650px"
            width="650"
          >
            <tbody>
              <tr>
                <td align="center" style="padding: 0px 25px" valign="top">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-family: 'inter', helvetica, sans-serif;
                            font-size: 14px;
                            line-height: 20px;
                            color: #000000;
                            font-weight: 400;
                          "
                          valign="top"
                        >
                          Hi there, <br />
                          Welcome!<br /><br />
                          ${message}
                          <br /><br />
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          bgcolor="#40559b"
                          height="50"
                          style="
                            font-family: 'inter', helvetica, sans-serif;
                            font-size: 14px;
                            color: #ffffff;
                            font-weight: 500;
                            height: 50px;
                            border-radius: 4px;
                          "
                          valign="middle"
                        >
                          <a
                            href="${link}"
                            style="
                              text-decoration: none;
                              color: #ffffff;
                              display: block;
                              line-height: 50px;
                            "
                            target="_blank"
                            data-saferedirecturl="${link}"
                          >
                            CLICK
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-family: 'inter', helvetica, sans-serif;
                            font-size: 14px;
                            line-height: 20px;
                            color: #000000;
                            font-weight: 400;
                          "
                          valign="top"
                        >
                          <br /><br />If the link is not clickable then Kindly
                          copy the link and paste it in the browser.
                          <br />
                          <br />
                          ${link}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td align="left" valign="top">
          <table
            align="left"
            bgcolor="#FFFFFF"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="width: 650px"
            width="650"
          >
            <tbody>
              <tr>
                <td align="center" style="padding: 0px 25px" valign="top">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-family: 'inter', helvetica, sans-serif;
                            font-size: 12px;
                            line-height: 19px;
                            font-weight: 500;
                          "
                          valign="top"
                        >
                          <br />
                          <hr />
                          <br />
                          Regards <br />
                          <strong>Team </strong> <br />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  `,
};
