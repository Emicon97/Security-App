import ReportModel from '../models/toDos';

async function sendReport () {
   const report = await ReportModel.create({
      
   });

   await report.save();
}

module.exports = {

}