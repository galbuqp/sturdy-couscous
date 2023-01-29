import Link from "next/link.js"
import { useRouter } from "next/router.js"
import { useSelector } from "react-redux"


const NAV = [
    {
        id: 0,
        name: "home",
        title: "Home",
        icon: "fas fa-home",
        href: "/"
    },
    {
        id: 1,
        name: "cart",
        title: "Carrinho",
        icon: "fas fa-shopping-cart",
        href: "/cart",
        badge: true
    },
]

const Menu = () => {
    const cart = useSelector(state => state.cart.items)
    const router = useRouter()
    return <div className="fixed z-30 bottom-0 shadow-lg flex group lg:flex-col left-0 h-14 w-full lg:w-20 lg:h-full bg-gray-50 backdrop-blur-lg transition-all duration-200 ease-linear">
        {
            NAV.map((item) => {
                const isActive = item.href === router.asPath
                return <Link key={item.name} href={item.href} className={`${  isActive ? `text-purple-500` : `text-gray-400`} px-3 py-2 lg:py-5 lg:px-2 my-auto lg:my-0 w-full text-center transition-all duration-150 relative`}>
                    <div className="icon">
                        <i className={`${ item.icon } text-xl lg:text-2xl`}></i>
                    </div>
                    <div className="label hidden lg:block">
                        <p className="text-sm font-sans">{ item.title }</p>
                    </div>

                    {
                        item.badge && cart.length > 0 && <span className={`${ isActive ? `bg-purple-200 text-purple-600` : `text-purple-50 bg-purple-500`} absolute w-5 h-5 rounded-full text-xs flex top-0 lg:top-3 right-[50%] translate-x-[-50%] lg:right-2 font-bold`}>
                            <span className="m-auto">{ cart.length }</span>
                        </span>
                    }
                </Link>
            })
        }
    </div>
}

export { Menu }