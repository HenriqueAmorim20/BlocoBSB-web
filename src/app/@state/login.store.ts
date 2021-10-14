import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Credentials } from '../@shared/interfaces/credentials';

export class Login {
  static readonly type = '[Login] Add';
  constructor(public payload: Credentials | null) {}
}

export class Logout {
  static readonly type = '[Login] Edit';
  constructor() {}
}

@State({
  name: 'login',
  defaults: {
    email: null,
    idConsulta: null,
  },
})
@Injectable()
export class AuthStore {
  @Action(Login)
  public login(ctx: StateContext<Credentials>, action: Login) {
    ctx.setState({
      ...ctx.getState(),
      email: action.payload?.email,
    });
  }

  @Action(Logout)
  public logout(ctx: StateContext<Credentials>) {
    ctx.setState({
      ...ctx.getState(),
      email: null,
    });
  }
}
