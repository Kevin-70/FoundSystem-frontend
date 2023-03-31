<template>
        <div class="container">
            <div class="login-wrapper">
            <div class="header">Login</div>
            <div class="form-wrapper">
                <input type="text" name="username" placeholder="username" class="input-item">
                <input type="password" name="password" placeholder="password" class="input-item">
                <div class="btn">Staff Login</div>
                <div class="btn">Admin Login</div>
            </div>
            <div class="msg">
                Don't have account?
                <a href="#">Sign up</a>
            </div>
        </div>
    </div>

    
</template>


<style>
            * {
                margin: 0;
                padding: 0;
            }
        
        body {
            height: 100%;  

        }
        .container {
            height: 100%;
            width: 100%;
        position: fixed;
            /* background-size: 100% 100%; */
            background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
        }
        .login-wrapper {
            background-color: #faf9f9;
            width: 358px;
            height: 588px;
            border-radius: 15px;
            padding: 0 50px;
            position: relative;
            left: 50%;/*the relative position in the */
            top: 10%;
            transform: translate(-50%, 0%);/*self's relative postion*/
        }
        .header {
            font-size: 38px;
            font-weight: bold;
            text-align: center;
            line-height: 200px;
            color: #000;
            
        }
        .input-item {
            display: block;
            width: 100%;
            margin-bottom: 20px;
            border: 0;
            padding: 10px;
            border-bottom: 1px solid rgb(128, 125, 125);
            font-size: 15px;
            outline: none;
        }
        .input-item:placeholder {
            text-transform: uppercase;
        }
        .btn {
            text-align: center;
            padding: 10px;
            width: 100%;
            margin-top: 40px;
            background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
            color: #fff;
        }
        .msg {
            text-align: center;
            line-height: 88px;
            color: #000;
        }
        a {
            text-decoration-line: none;
            color: #abc1ee;
        }
        
    </style>