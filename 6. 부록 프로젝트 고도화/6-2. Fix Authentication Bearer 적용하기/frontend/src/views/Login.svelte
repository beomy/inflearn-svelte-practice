<script>
  import { push, link } from 'svelte-spa-router';
  import LoginLayout from '@/layouts/LoginLayout.svelte';
  import { login } from '@/store/users';

  let email;
  let password;

  async function handleClick () {
    // 로그인 API 호출
    const { token } = await login({ email, password });
    localStorage.setItem('token', token);

    // 로그인 성공시 / 로 이동
    push('/');
  }
</script>

<LoginLayout>
  <div class="login-header">스도쿠</div>
  <div class="login-info">
    <div><input type="email" bind:value={email}></div>
    <div><input type="password" bind:value={password}></div>
  </div>
  <div>
    <button on:click={handleClick}>로그인</button>
    <a href="/join" use:link>회원가입</a>
  </div>
</LoginLayout>
