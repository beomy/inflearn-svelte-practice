<script>
	import { onMount } from 'svelte';
	import { replace } from 'svelte-spa-router';
	import { jwtEncoded, jwtDecoded } from '@/store/users';

	onMount(() => {
		const token = localStorage.getItem('token');
		if (!token) return replace('/login');

		$jwtEncoded = token;
		// 토큰 만기 처리
		if ($jwtDecoded.exp * 1000 < Date.now()) {
			// 로그아웃 처리
			handleLogout();
		}
	});

	function handleLogout () {
		localStorage.removeItem('token');
		return replace('/login');
	}
</script>

<div class="header">
	{$jwtDecoded.email} <button on:click={handleLogout}>Logout</button>
</div>
<div class="contents">
  <slot></slot>
</div>

<style>
	.contents {
		width: 600px;
		margin: auto;
	}
	.header {
		width: 1200px;
		margin: auto;
		text-align: right;
	}

	@media (max-width: 1200px) {
		.header {
			width: 600px;
		}
	}
</style>