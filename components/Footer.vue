<template>
	<footer>
		<div class="footer-content">
			<div class="footer-section">
				<h3>바람위키</h3>
				<p>바람의나라 아이템, 몬스터, 퀘스트 정보를 한눈에</p>
			</div>

			<div class="footer-section">
				<h3>연락처</h3>
				<a href="mailto:baramwiki@gmail.com">baramwiki@gmail.com</a>
			</div>
		</div>

		<div class="footer-bottom">
			<p>© 2024 바람위키 - 바람의나라 종합 도감 사이트</p>
		</div>
	</footer>
</template>

<script setup></script>

<style scoped lang="scss">
footer {
	background-color: var(--secondary-bg);
	color: var(--text-color);
	border-top: 1px solid var(--secondary-border);
	padding: 2rem 1rem;
	margin-top: 10rem;
}

.footer-content {
	max-width: 1200px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 2rem;
	padding-bottom: 2rem;
}

.footer-section {
	h3 {
		color: var(--highlight);
		margin-bottom: 1rem;
		font-size: 1.2rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	a {
		color: var(--secondary-text);
		text-decoration: none;
		transition: color 0.3s ease;

		&:hover {
			color: var(--highlight);
		}
	}
}

.footer-bottom {
	text-align: center;
	padding-top: 1rem;
	border-top: 1px solid var(--secondary-border);

	p {
		color: var(--secondary-text);
		margin: 0;
		font-size: 0.9rem;
	}
}

@media (max-width: 768px) {
	.footer-section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.footer-content {
		grid-template-columns: 1fr;
	}
}
</style>
