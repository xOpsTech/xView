export interface UserDetails {

    id?: String,
    email?: String,
    name?: String,
    picture?: String,
    banner?: String,
    firstname?: String,
    lastname?: String,
    password?: String,
    login_method?: String,
    userType?: {
        name?: String,
        management?: boolean,
        develop?: boolean,
        userTypeManager?: boolean,
        profileManager?: boolean,
        userManager?: boolean,
        inputSourceManager?: boolean
    },
    tenantId?: String,
    personalization?: {
        timezone?: String,
        theme?: String,
        dashboard?: [String]
    }

}