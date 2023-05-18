const BASE_URL = 'http://43.139.159.107:8080'

export default {
    async Login(email, password, identity) {
        try {
            const response = await fetch(`${BASE_URL}/user/LoginEmail?identity=${identity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    pwd: password
                })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async AdminLogin(email, password) {
        try {
            const response = await fetch(`${BASE_URL}/user/LoginEmail?identity=1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    pwd: password
                })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async Register(email, username, password, identity) {
        try {
            const response = await fetch(`${BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    name: username,
                    pwd: password,
                    identity: identity
                })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async GetUserInfo(email, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/getUserByMail?mail=${email}`, {
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async GetUserInfo(email, identity, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/getUserByMailAndIdentity?identity=${identity}&mail=${email}`, {
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async GetMyInfo(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/getMyInfo`, {
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async UpdateUserInfo(bio, phoneNumber, sex, name, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/editMyInfo?bio=${bio}&name=${name}&phoneNumber=${phoneNumber}&sex=${sex}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async GetAllGroups(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/getAllGroups`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async GetAllMessage(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/application/edit/getMyAppsToExam`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async GetUserByGroupName(groupName, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/view/getAllGroups?groupName=${groupName}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async GetAllManagers(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/edit/getAllManagers`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async StaffJoinGroup(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/joinGroup`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async ForceJoinGroup(groupname, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/edit/JoinApi?groupName=${groupname}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async CreateGroup(groupname, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/president/createGroup?groupName=${groupname}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async DeleteGroup(groupname, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/president/deleteGroup?groupName=${groupname}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async EditGroup(groupname, updateName, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/president/modifyGroup?groupName=${groupname}&updateName=${updateName}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async AssignManager(groupname, manEmail, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/president/assignManager?groupName=${groupname}&manEmail=${manEmail}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async unAssignManager(groupname, manEmail, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/president/unassignManager?groupName=${groupname}&manEmail=${manEmail}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async GetAllGroupApp(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/getMyGroupAppToExam`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async GetAllFundToExam(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/application/edit/getMyExpendsToExam`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async passApp(appId, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/application/edit/passApplication?appId=${appId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async rejectApp(appId, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/application/edit/rejectApplication?appId=${appId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async passFund(appId, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/application/edit/passExpenditure?appId=${appId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async rejectFund(appId, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/application/edit/rejectExpenditure?appId=${appId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async passGroupApp(applyId, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/edit/passApplyGroup?applyId=${applyId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async rejectGroupApp(applyId, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/edit/rejectApplyGroup?applyId=${applyId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async QuitLogin(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async IfLogin(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/isLogin`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async SendEmail(identity, mail) {
        try {
            const response = await fetch(`${BASE_URL}/user/sendEmail?mail=${mail}&identity=${identity}`, {
                method: 'POST',
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
    async CheckEmail(identity, mail, code) {
        try {
            const response = await fetch(`${BASE_URL}/user/checkCode?mail=${mail}&identity=${identity}&code=${code}`, {
                method: 'POST',
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(error)
        }
    },
}