const { lecturerDetails, studentDetails, consultationDetails, studentBooking, consultationPeriods } = require('./dbProvider')
const examplePipeline = require('../controllers/examplePipeline')

async function getConsultationDetails(lecturer_id) {
  try {
    const consultationDetailsData = await consultationDetails.find({ lecturerId: lecturer_id })
    return consultationDetailsData;
  } catch (err) {
    console.error(err)
    throw err; // Throw the error to handle it in the calling function
  }
}

async function approveConsultation(consultationID) {
  try {
    await consultationDetails.updateOne(
      { consultationId: consultationID },
      { $set: { status: "approved" } }
    );
  } catch (err) {
    console.error(err);
    throw err; // Throw the error to handle it in the calling function
  }
}

async function cancelConsultation(consultationID) {
  try {
    await consultationDetails.updateOne(
      { consultationId: consultationID },
      { $set: { status: "disapproved" } }
    );
  } catch (err) {
    console.error(err);
    throw err; // Throw the error to handle it in the calling function
  }
}

async function getMoreDetails() {
  try {
    const consultationDetailsData = await consultationDetails.aggregate(examplePipeline)
    return consultationDetailsData;
  } catch (err) {
    console.error(err);
    throw err; // Throw the error to handle it in the calling function
  }
}



module.exports = { getConsultationDetails, approveConsultation, cancelConsultation, getMoreDetails};