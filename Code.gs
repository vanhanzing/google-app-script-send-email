/**
 * Sends emails with data from the current spreadsheet.
 */
function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; // First row of data to process
  var lastRow = sheet.getLastRow(); // Last row of data to process
  var lastColumn = sheet.getLastColumn(); // Last column of data to process
  Logger.log(lastRow); // it displays the logs
  Logger.log(lastColumn);
  // Fetch the range of cells 2 to last row
  var dataRange = sheet.getRange(startRow, 1, lastRow-1, lastColumn);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  Logger.log(data);
  for (i in data) {
    var row = data[i];
    var body = HtmlService.createTemplateFromFile("Salary_email_template");
    var todayDate = new Date();
    var d = todayDate;
    d.setDate(0);
     body.lastDate = Utilities.formatDate(d, "GMT", "MMMM,YYYY"); // gives the last month
     body.emailAddress = row[0]; // First column
     body.message = row[1]; // Second column
     
     // soon on other deatails from google spreadsheet
    
    var subject = 'Testing Automation from googlesheet'; // an email subject to send
   
     try{
      MailApp.sendEmail({
        to: body.emailAddress,
        subject: subject,
        htmlBody: body.evaluate().getContent(), 
       });
  }
  catch(error){
    Logger.log(error)
  }
    
  }
}

/**
*include another file like css,javascipt
*/
function include(filename){
   return  HtmlService.createHtmlOutputFromFile(filename).getContent();
}
 
