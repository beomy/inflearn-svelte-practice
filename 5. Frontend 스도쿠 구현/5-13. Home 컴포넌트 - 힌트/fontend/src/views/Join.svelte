<script>
  import { push, link } from 'svelte-spa-router';
  import LoginLayout from '@/layouts/LoginLayout.svelte';
  import { login, valid, join } from '@/store/users';

  let email;
  let password;

  async function handleClick () {
    // 회원가입 유효성 체크 API 호출
    const { isValid } = await valid({ email });

    if (!isValid) return alert('중복가입된 이메일입니다.');

    // 유효성 체크가 통과한 후 회원가입 API 호출
    await join({ email, password });

    // 회원가입 성공시 /login 로 이동
    push('/login');
  }
</script>

<LoginLayout>
  <div class="login-header">스도쿠</div>
  <div class="login-info">
    <div><input type="email" bind:value={email}></div>
    <div><input type="password" bind:value={password}></div>
  </div>
  <div>
    <button on:click={handleClick}>가입하기</button>
  </div>
</LoginLayout>
