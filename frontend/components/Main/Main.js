import { Menu } from "../Menu/Menu"



const Main = ({ children }) => {
    return <main className="bg-purple-500/10">
        <Menu />
        <div className="content ml-0 lg:ml-20 px-3 py-5 lg:p-5 min-h-screen pb-20 lg:pb-0">
            { children }
        </div>
    </main>
}

export { Main }