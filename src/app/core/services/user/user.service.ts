import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';


import { Layout, Scheme, Theme } from 'app/app.config';
import { AppService } from 'app/app.service';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(

        private _http      : HttpClient,
        private _fuseConfig: FuseConfigService,
        private _url       : AppService        
    ) {}


    fetchUserData(): any {
        return this._http.get(this._url.getUrl()+'user/');
    }

    setUser(user: any): any {
        localStorage.setItem('user', user);
    }

    getUser(): any {
        return JSON.parse(localStorage.getItem('user'));
    }

    getUserGroups(): any {
        const user = localStorage.getItem('user');
        const groups = user ? user['groups'] : [];
        return groups.map((group) => group.name);
    }

    register(user: any): any {
        return this._http.post('users/registration/', user);
    }

    setScheme(scheme: Scheme): void {
        this._fuseConfig.config = { scheme };
        return localStorage.setItem('scheme',scheme);
    }

    getScheme(): any {
        return localStorage.getItem('scheme');
    }

    setTheme(theme: Theme): void {
        this._fuseConfig.config = { theme };
        return localStorage.setItem('theme',theme);
    }

    getTheme(): any {
        return localStorage.getItem('theme');
    }

    setLayout(layout: Layout): void {
        this._fuseConfig.config = { layout };
        return localStorage.setItem('layout',layout);
    }

    getLayout(): any {
        return localStorage.getItem('layout');
    }

    getLayoutType(): any {
        let layout = this.getLayout() || 'classy';
        let L_types = {
            horizontal: ['centered', 'enterprise', 'material', 'modern'],
            vertical  : ['classic', 'classy', 'compact', 'dense', 'futuristic', 'thin']
        };
        for (let key of Object.keys(L_types)) {
            if (L_types[key].includes(layout)) {
                return key;
            }
        }
        return;
    }
}

