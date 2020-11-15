<div class="login-box">
  <slot></slot>
</div>

<style>
  .login-box {
    width: 300px;
    margin: auto;
    padding-top: 300px;
    text-align: center;
  }
  .login-box :global(.login-header) {
    font-size: 40px;
    margin-bottom: 10px;
  }
  .login-box :global(.login-info) {
    margin-bottom: 10px;
  }
  .login-box :global(.login-info input) {
    height: 30px;
    width: 100%;
  }
</style>