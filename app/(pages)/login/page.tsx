import styles from './login.module.css';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { login } from '@/app/libs/action';
import GithubSignIn from '@/app/components/GithubSignIn';

const LoginForm = () => {
  // const [state, formAction] = useFormState(login, undefined);

  return (
    <section className={styles.container}>
      <GithubSignIn />
      <div className={styles.imgContainer}>
        <Image
          src='/login.svg'
          alt='Login Image'
          fill
          className={styles.img}
        />
      </div>
      <form
        className={styles.form}
        action={login}
      >
        <input
          type='text'
          placeholder='username'
          name='username'
        />
        <input
          type='password'
          placeholder='password'
          name='password'
        />
        <button>Login</button>
        {/* {state?.error} */}
        <Link href='/register'>
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </form>
    </section>
  );
};

export default LoginForm;
