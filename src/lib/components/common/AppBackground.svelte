<ul>
	<li />
	<li />
	<li />
	<li />
	<li />
	<li />
	<li />
	<li />
	<li />
	<li />
</ul>

<style lang="postcss">
	@keyframes animate {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 0.8;
			border-radius: 10%;
		}
		100% {
			transform: translateY(-1000px) rotate(720deg);
			opacity: 0;
			border-radius: 50%;
		}
	}

	ul {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
	ul li {
		@apply bg-[#eef9eb] dark:bg-[#0f1219];

		position: absolute;
		display: block;
		list-style: none;
		width: 20px;
		height: 20px;
		animation: animate 19s linear infinite;
	}

	ul li:nth-child(0) {
		left: 71%;
		width: 152px;
		height: 152px;
		bottom: -152px;
		animation-delay: 1s;
	}
	ul li:nth-child(1) {
		left: 64%;
		width: 121px;
		height: 121px;
		bottom: -121px;
		animation-delay: 4s;
	}
	ul li:nth-child(2) {
		left: 85%;
		width: 176px;
		height: 176px;
		bottom: -176px;
		animation-delay: 3s;
	}
	ul li:nth-child(3) {
		left: 3%;
		width: 193px;
		height: 193px;
		bottom: -193px;
		animation-delay: 6s;
	}
	ul li:nth-child(4) {
		left: 39%;
		width: 105px;
		height: 105px;
		bottom: -105px;
		animation-delay: 9s;
	}
	ul li:nth-child(5) {
		left: 64%;
		width: 183px;
		height: 183px;
		bottom: -183px;
		animation-delay: 24s;
	}
	ul li:nth-child(6) {
		left: 2%;
		width: 198px;
		height: 198px;
		bottom: -198px;
		animation-delay: 3s;
	}
	ul li:nth-child(7) {
		left: 86%;
		width: 187px;
		height: 187px;
		bottom: -187px;
		animation-delay: 34s;
	}
	ul li:nth-child(8) {
		left: 21%;
		width: 190px;
		height: 190px;
		bottom: -190px;
		animation-delay: 30s;
	}
	ul li:nth-child(9) {
		left: 23%;
		width: 129px;
		height: 129px;
		bottom: -129px;
		animation-delay: 16s;
	}
</style>
