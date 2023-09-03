// import TallySubmissionSample from '@/utils/Tally.json';
const TallySubmissions = [];

export default async function handler(req, res) {
	const { method } = req;

	const TallySubmissionSample = req.body;
	console.log('TallySubmissionSample', TallySubmissionSample);

	const submissionData = {};

	submissionData.slot = TallySubmissionSample.data.fields[0].value;
	submissionData.email = TallySubmissionSample.data.fields[4].value;
	submissionData.phone_no = TallySubmissionSample.data.fields[5].value;
	submissionData.first_name = TallySubmissionSample.data.fields[6].value;
	submissionData.last_name = TallySubmissionSample.data.fields[8].value;
	submissionData.position = TallySubmissionSample.data.fields[7].value;
	submissionData.alternate_email = TallySubmissionSample.data.fields[9].value;
	submissionData.alternate_phone_no = TallySubmissionSample.data.fields[10].value;
	submissionData.company = TallySubmissionSample.data.fields[11].value;
	submissionData.website = TallySubmissionSample.data.fields[12].value;
	submissionData.address = TallySubmissionSample.data.fields[14].value;

	TallySubmissions.push(submissionData);
	console.log('submissionData', submissionData);

	console.log('TallySubmissions', TallySubmissions);

	res.status(200).json({ ...submissionData, ...TallySubmissionSample });
}
