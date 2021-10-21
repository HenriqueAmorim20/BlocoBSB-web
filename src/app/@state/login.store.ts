import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { Credentials } from '../@shared/interfaces/credentials';
import { Admin } from '../@shared/interfaces/credentials';


export class Login {
  static readonly type = '[Login] Add';
  constructor(public payload: Credentials | null) {}
}

export class Logout {
  static readonly type = '[Login] Edit';
  constructor() {}
}

export class IsAdmin {
  static readonly type = '[Admin] state';
  constructor(public payload: Credentials | null) {}
}

@State({
  name: 'login',
  defaults: {
    email: null,
    isAdmin: null
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

  @Action(IsAdmin)
  public isAdmin(ctx: StateContext<Admin>, action: IsAdmin) {
    ctx.setState({
      ...ctx.getState(),
      isAdmin: action.payload?.email === environment.admin ? true : false,
    });
  }
}
