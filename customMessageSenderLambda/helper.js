function createTemporaryPasswordTemplate(type, emailAddress, codeParameter) {
    let customType;
    let subTypeMessage;
    switch (type) {
        case "athlete":
            customType = "Athlete"
            subTypeMessage = "You have been invited as an Athlete. Please Login using the Button below & complete the onboarding process to begin your journey to getting scouted!"
            break;
        case "staff":
            customType = "Team Staff";
            subTypeMessage = "You have been invited as Team Staff. Please Login using the Button below & complete the onboarding process to begin scouting Basketball Athletes Worldwide!"
            break;
        default:
            subTypeMessage = "You have been invited to our Platform. Please Login using the Button below & complete the onboarding process to start your experience."
    }
    const typeMessage = customType
        ? (' as a ' + customType + ".")
        : ".";
    const html = `<!DOCTYPE html> <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"> <head> <title></title> <meta content="text/html; charset=us-ascii" http-equiv="Content-Type"> <meta content="width=device-width, initial-scale=1.0" name="viewport"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--> <!--[if !mso]><!--> <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"> <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"><!--<![endif]--> <style> * { box-sizing: border-box; } .gradient { background-image: linear-gradient(90deg, rgba(253, 252, 251, 0.9) 0%, rgba(226, 209, 195, 0.33) 50%, rgba(253, 252, 251, 0.9) 100%) } body { margin: 0; padding: 0; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; } #MessageViewBody a { color: inherit; text-decoration: none; } p { line-height: inherit } .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; } .image_block img+div { display: none; } @media (max-width:720px) { .desktop_hide table.icons-inner { display: inline-block !important; } .icons-inner { text-align: center; } .icons-inner td { margin: 0 auto; } .row-content { width: 100% !important; } .mobile_hide { display: none; } .stack .column { width: 100%; display: block; } .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; } .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; } } </style> </head> <body style="margin: 0; background-color: #FFFFFF; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;"> <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <div class="spacer_block" style="height:30px;line-height:30px;font-size:1px;"> </div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #333; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 35px; padding-left: 20px; padding-right: 20px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%"> <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tr> <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;"> <div align="center" class="alignment" style="line-height:10px"><img alt="Image" src="https://www.globalrecruits.net/logo.png" style="display: block; height: auto; border: 0; width: 155px; max-width: 100%;" title="Image" width="155"></div> </td> </tr> </table> </td> <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%"> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;"> <div style="font-family: sans-serif"> <div class="" style="font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #4e2217; line-height: 1.2;"> <p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 16.8px;"><span style="font-size:12px;">Achieve your <strong>Dreams</strong></span></p> <p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 16.8px;"><span style="font-size:12px;">Become a College <strong>Athlete</strong>&nbsp;</span></p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3 gradient" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-left:30px;padding-right:30px;padding-top:10px;"> <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif"> <div class="" style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #4e2217; line-height: 1.2;"> <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:30px;"><strong><span style="">Welcome, ${emailAddress}!</span></strong></span></p> </div> </div> </td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15px;"> <div style="font-family: sans-serif"> <div class="" style="font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #4e2217; line-height: 1.5;"> <p style="margin: 0; font-size: 12px; mso-line-height-alt: 18px;"><strong><span style="font-size:20px;">You have been invited to join our platform${typeMessage}</span></strong></p> </div> </div> </td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-bottom:20px;padding-left:30px;padding-right:30px;padding-top:15px;"> <div style="font-family: sans-serif"> <div class="" style="font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #4e2217; line-height: 1.5;"> <p style="margin: 0; font-size: 12px; mso-line-height-alt: 24px;"><span style="font-size:16px;">${subTypeMessage}</span></p><p style="margin: 0; font-size: 12px; mso-line-height-alt: 18px;">&nbsp;</p> <p style="margin: 0; font-size: 12px; mso-line-height-alt: 24px;"><span style="font-size:16px;">You have been issued a Temporary Password which you will be forced to change on the first login.&nbsp;</span></p> <p style="margin: 0; font-size: 12px; mso-line-height-alt: 18px;">&nbsp;</p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4 gradient" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-left:35px;padding-right:10px;padding-top:25px;"> <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif"> <div class="" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #4e2217; line-height: 1.2; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"> <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 14.399999999999999px;"><span style="font-size:30px;">Your Temporary Password</span></p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5 gradient" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-left:35px;padding-right:10px;padding-top:25px;"> <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif"> <div class="" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #4e2217; line-height: 1.2; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"> <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 14.399999999999999px;"><span style="font-size:30px;">${codeParameter}</span></p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 60px; padding-top: 25px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <table border="0" cellpadding="10" cellspacing="0" class="button_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tr> <td class="pad"> <div align="center" class="alignment"> <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.globalrecruits.net/dashboard" style="height:72px;width:240px;v-text-anchor:middle;" arcsize="13%" stroke="false" fillcolor="#4e2217"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:26px"><![endif]--><a href="https://www.globalrecruits.net/dashboard" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#4e2217;border-radius:9px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:10px;padding-bottom:10px;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:26px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:45px;padding-right:45px;font-size:26px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="font-size: 16px; word-break: break-word; line-height: 2; mso-line-height-alt: 32px;"><span data-mce-style="font-size: 26px;" dir="ltr" style="font-size: 26px;"><strong>LOGIN NOW</strong></span></span></span></a> <!--[if mso]></center></v:textbox></v:roundrect><![endif]--> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 35px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <table border="0" cellpadding="10" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad"> <div style="font-family: sans-serif"> <div class="" style="font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #838383; line-height: 1.5;"> <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;"><span style="color:#000000;font-size:14px;"><strong>GlobalRecruits LLC</strong></span>,</p> <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;">1340 S Dixie Hwy Apt 1110,</p> <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;">Coral Gables, FL33146</p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </body> </html>`
    return html;
}

function createResetCodeTemplate(type, emailAddress, codeParameter) {
    let actionMessage;
    switch (type) {
        case "CustomMessage_ResendCode":
            actionMessage = "resend a Confirmation Code";
            break;
        case "CustomMessage_ForgotPassword":
            actionMessage = "reset your Password";
            break;
        case "CustomMessage_UpdateUserAttribute":
            actionMessage = "update your Email Address";
            break;
        default: 
            actionMessage = "receive a Verification Code"
            break;
    }

    const html = `<!DOCTYPE html> <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"> <head> <title></title> <meta content="text/html; charset=us-ascii" http-equiv="Content-Type"> <meta content="width=device-width, initial-scale=1.0" name="viewport"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--> <!--[if !mso]><!--> <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"> <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"><!--<![endif]--> <style> * { box-sizing: border-box; } .gradient { background-image: linear-gradient(90deg, rgba(253, 252, 251, 0.9) 0%, rgba(226, 209, 195, 0.33) 50%, rgba(253, 252, 251, 0.9) 100%) } body { margin: 0; padding: 0; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; } #MessageViewBody a { color: inherit; text-decoration: none; } p { line-height: inherit } .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; } .image_block img+div { display: none; } @media (max-width:720px) { .desktop_hide table.icons-inner { display: inline-block !important; } .icons-inner { text-align: center; } .icons-inner td { margin: 0 auto; } .row-content { width: 100% !important; } .mobile_hide { display: none; } .stack .column { width: 100%; display: block; } .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; } .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; } } </style> </head> <body style="margin: 0; background-color: #FFFFFF; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;"> <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <div class="spacer_block" style="height:30px;line-height:30px;font-size:1px;"> </div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #333; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 35px; padding-left: 20px; padding-right: 20px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%"> <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tr> <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;"> <div align="center" class="alignment" style="line-height:10px"><img alt="Image" src="https://www.globalrecruits.net/logo.png" style="display: block; height: auto; border: 0; width: 155px; max-width: 100%;" title="Image" width="155"></div> </td> </tr> </table> </td> <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%"> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;"> <div style="font-family: sans-serif"> <div class="" style="font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #4e2217; line-height: 1.2;"> <p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 16.8px;"><span style="font-size:12px;">Achieve your <strong>Dreams</strong></span></p> <p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 16.8px;"><span style="font-size:12px;">Become a College <strong>Athlete</strong>&nbsp;</span></p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3 gradient" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-left:30px;padding-right:30px;padding-top:10px;"> <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif"> <div class="" style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #4e2217; line-height: 1.2;"> <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><span style="font-size:30px;"><strong><span style="">Hello, ${emailAddress}!</span></strong></span></p> </div> </div> </td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15px;"> <div style="font-family: sans-serif"> <div class="" style="font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #4e2217; line-height: 1.5;"> <p style="margin: 0; font-size: 12px; mso-line-height-alt: 18px;"><strong><span style="font-size:20px;">You have requested to ${actionMessage}</span></strong></p> </div> </div> </td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-bottom:20px;padding-left:30px;padding-right:30px;padding-top:15px;"> <div style="font-family: sans-serif"> <div class="" style="font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #4e2217; line-height: 1.5;"> <p style="margin: 0; font-size: 12px; mso-line-height-alt: 24px;"><span style="font-size:16px;">If you haven't issued this request please reset your password immediately as your account may be compromised.</span></p></div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4 gradient" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-left:35px;padding-right:10px;padding-top:25px;"> <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif"> <div class="" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #4e2217; line-height: 1.2; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"> <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 14.399999999999999px;"><span style="font-size:30px;">Your Reset Code</span></p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5 gradient" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad" style="padding-left:35px;padding-right:10px;padding-top:25px;"> <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif"> <div class="" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #4e2217; line-height: 1.2; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"> <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 14.399999999999999px;"><span style="font-size:30px;">${codeParameter}</span></p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%"> <tbody> <tr> <td></td> </tr> </tbody> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%"> <tbody> <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 700px;" width="700"> <tbody> <tr> <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 35px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%"> <table border="0" cellpadding="10" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%"> <tr> <td class="pad"> <div style="font-family: sans-serif"> <div class="" style="font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #838383; line-height: 1.5;"> <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;"><span style="color:#000000;font-size:14px;"><strong>GlobalRecruits LLC</strong></span>,</p> <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;">1340 S Dixie Hwy Apt 1110,</p> <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;">Coral Gables, FL33146</p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </body> </html>`
    return html;
}

module.exports = { createTemporaryPasswordTemplate, createResetCodeTemplate }