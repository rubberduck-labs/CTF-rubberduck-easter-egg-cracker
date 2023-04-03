import { TerminalRunner } from "../Terminal";
import { dbConnect } from "../../../util/Supabase";
import Sleep from "../../../common/Sleep";

const runner: TerminalRunner = async (context, println, prompt) => {
  await println('sh ./login-or-signup.sh');

  await println('how would you like to login or singup?');
  await println(`
    [1] email <br>
    [2] github <br>
  `)
  switch (await prompt('')) {
    case '1': {
      const email = await prompt('enter email address:');
      await dbConnect().auth
        .signInWithOtp({ email })
        .then(({ error }) => { if (error) throw error.nessage });
      await println(`email with OTP sent to ${email}`);
      await Sleep(9999999); // Linger console
    }
    case '2': {
      await dbConnect().auth
        .signInWithOAuth({ provider: 'github' })
        .then(({ error }) => { if (error) throw error.nessage });
      await Sleep(9999999); // Linger console
    }
  }
};

export default runner;