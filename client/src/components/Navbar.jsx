import '../output.css'

const Navbar = () => {
	return (
		<nav class="px-8 py-3 bg-[#f1f5fc]">
			<div class="container flex flex-wrap justify-between items-center mx-auto">
				<a href="/" class="flex items-center">
					{/* <img src="" class="mr-3 h-6 sm:h-9" alt="Hospital Logo" /> */}
					<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
						Hospital Logo
					</span>
				</a>

				<div class="w-full block w-auto">
					<ul class="flex flex-row space-x-8 p-4 border border-gray-100">
						<a href="/" class="block py-2 pr-4 font-semibold pl-3 text-gray-700 text-xl rounded">
							Home
						</a>
						<a href="/" class="block py-2 pr-4 font-semibold pl-3 text-gray-700 text-xl rounded">
							Services
						</a>
						<a href="/" class="block py-2 pr-4 font-semibold pl-3 text-gray-700 text-xl rounded">
							Doctors
						</a>
						<a href="/" class="block py-2 pr-4 font-semibold pl-3 text-gray-700 text-xl rounded">
							About us
						</a>
						<a href="/" class="block py-2 pr-4 font-semibold pl-3 text-gray-700 text-xl rounded">
							Contact us
						</a>
						<a
							href="/SignIn"
							class="block py-2 pr-8 font-semibold pl-5 text-white text-xl border rounded-2xl border-blue-700 bg-blue-700 text-white text-center border-2 rounded"
						>
							Sign in
						</a>
						<a
							href="/SignUp"
							class="block py-2 pr-8 font-semibold pl-5 text-blue-700 text-xl border rounded-2xl border-blue-700 hover:bg-blue-700 hover:text-white text-center border-2 rounded"
						>
							Sign up
						</a>
					</ul>
				</div>
			</div>
		</nav>
	)
}
export default Navbar
