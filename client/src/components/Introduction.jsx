import '../output.css'

const Introduction = () => {
	return (
		<div class="py-10">
			<div class="flex flex-col items-center" id="heading">
				<h1 class="text-center text-4xl text-blue-800 font-bold"> We care </h1>
				<h1 class="text-center text-4xl pb-4 "> about your health </h1>
				<h1 class="text-center text-xl w-[30em]">
					Good health is the state of mental, physical and social well being and it does not just
					mean absence of diseases.
				</h1>
			</div>
			<div class="flex flex-row pt-10 justify-center" id="introductionButtons">
				<a href="/SignIn" class="bg-indigo-700 py-2 px-4 hover:bg-indigo-500 text-white font-semibold rounded rounded-2xl">
					Book an appointment
				</a>
			</div>
			<div class="flex space-x-5 justify-center pt-5">
				<h1 class="text-center text-[1.2rem]">Become member of our hospital community?</h1>
				<a href="/SignUp" class="text-indigo-700 text-[1.2rem] no-underline hover:underline ...">
					Sign Up!
				</a>
			</div>
		</div>
	)
}
export default Introduction
