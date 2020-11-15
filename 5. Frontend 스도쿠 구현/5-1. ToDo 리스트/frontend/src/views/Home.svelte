<script>
	import { onMount } from 'svelte';
	import DefaultLayout from '@/layouts/DefaultLayout.svelte';
	import { getUser } from '@/store/users';

	export let name;

	let result;
	onMount(async () => {
		result = await getUser();
	});
</script>

<DefaultLayout>
	{result}
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</DefaultLayout>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>