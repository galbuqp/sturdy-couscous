import { useDispatch, useSelector } from "react-redux"
import { Main } from '@/components/Main/Main'
import { addItem, removeItem } from "@/redux/slices/cart.slice.js"
import { money } from "@/shared/misc/moneyFormat.js"
import React from "react"
import Lottie from "react-lottie"
import emptyLottie from "@/assets/lotties/empty.json"
import Head from "next/head.js"


const PAYMENT_METHODS = [
    {
        id: 'pix',
        title: "PIX",
        discount: 15,
        logo: "https://devtools.com.br/img/pix/logo-pix-png-icone-520x520.png"
    },
    {
        id: 'boleto',
        title: "Boleto",
        discount: 5,
        logo: "https://www.deffo.com.br/media/wysiwyg/icon-boleto.png"
    },
    {
        id: 'credit',
        title: "Cartão de crédito",
        discount: 0,
        logo: "https://pic.onlinewebfonts.com/svg/img_552315.png"
    },
]
const Cart = () => {
    const [ payment, setPayment ] = React.useState(null)
    const cartItems = useSelector(state => state.cart.items)
    const dispatch = useDispatch()
    return <Main>
        <Head>
            <title>Carrinho de compras</title>
            <meta name="description" content="Compre seu produto com frete grátis e divida em até 12x" />
            <meta name="keywords" content="Produto, Camisa, Camiseta, loja, virtual" />
            <meta name="author" content="Gabriel Albuquerque" />
        </Head>
        <h1 className="text-3xl font-bold mb-5">Carrinho</h1>
        {
            cartItems.length === 0 && (
                <div className="bg-gray-50 px-5 py-5 rounded-lg shadow flex flex-col">
                    <div className="lottie w-full lg:w-1/4 mx-auto">
                        <Lottie isClickToPauseDisabled={true} options={{
                            loop: true,
                            autoplay: true, 
                            animationData: emptyLottie,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                            }} 
                        />
                    </div>
                    <div className="content text-center">
                        <span className="font-bold text-2xl">Oops!</span>
                        <p className="text-xl leading-none mt-2 opacity-70">Parece que você ainda não adicionou produtos no seu carrinho.</p>
                    </div>
                </div>
            )
        }

        {
            cartItems.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="bg-gray-50 p-3 shadow-lg rounded-lg shrink-0 h-fit">
                        <div className="section header mb-2">
                            <h1 className="font-bold">Produtos</h1>
                        </div>

                        <div className="body divide-y-2 divide-gray-200">
                        {
                            cartItems.map((item) => {
                                return <div className="px-3 py-3 rounded hover:bg-gray-100 flex flex-col xl:flex-row gap-3 group">
                                    <div className="w-24 hidden xl:block">
                                        <img className="rounded" src={item.image} alt="" />
                                    </div>
                                    <div className="details xl:max-w-[50%]">
                                        <h1 className="font-bold text-lg text-purple-500">{ item.name }</h1>
                                        <p className="text-sm italic opacity-60 truncate-1">{ item.description }</p>
                                        <h2 className="font-bold text-sm uppercase">{ money.format(parseFloat(item.value)) } <span className="opacity-40 italic">— Sub-total { money.format(parseFloat(item.value) * item.quantity)}</span></h2>
                                    </div>

                                    <div className="actions flex xl:ml-auto h-fit my-auto float-right">
                                        <button onClick={() => dispatch(removeItem({ ...item, quantity: 1 }))} className={`${ item.quantity > 1 ? `bg-gray-200 text-gray-400 hover:bg-gray-300 transition-all duration-100` : `bg-red-200 text-red-400`} px-3 py-1 rounded`}>
                                            <i className={`${ item.quantity > 1 ? `fas fa-minus` : `fas fa-trash`}`}></i>
                                        </button>
                                        <div className="quantity my-auto py-1 px-5 bg-gray-100 group-hover:bg-gray-200 transition-all duration-100">
                                            <p className="font-bold">{ item.quantity }</p>
                                        </div>
                                        <button onClick={() => dispatch(addItem({ id: item.id, quantity: 1 }))} className="px-3 py-1 rounded bg-gray-200 text-gray-400 hover:bg-gray-300 transition-all duration-100">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                        </div>
                    </div>
                    

                    <div className="flex flex-col gap-3 w-full">
                        <div className="bg-gray-50 p-3 shadow-lg rounded-lg w-full">
                            <div className="section header mb-2">
                                <h1 className="font-bold">Detalhes da compra</h1>
                            </div>
                            
                            <div className="body flex flex-col gap-3">
                                <div className="flex uppercase">
                                    <span className="font-bold shrink-0">Sub-total</span>
                                    <span className="h-1 w-full bg-gray-200 my-auto mx-5"></span>
                                    <span className="ml-auto opacity-60 font-bold">{ money.format(cartItems.map((item) => parseFloat(item.value) * item.quantity).reduce((a,b) => a + b, 0)) }</span>
                                </div>

                                <div className="flex uppercase">
                                    <span className="font-bold shrink-0">Descontos</span>
                                    <span className="h-1 w-full bg-gray-200 my-auto mx-5"></span>
                                    <span className="ml-auto opacity-60 font-bold">{ money.format(cartItems.map((item) => parseFloat(item.value) * item.quantity).reduce((a,b) => a + b, 0) * (payment && payment.discount > 0 ? (payment.discount / 100) : 0)) }</span>
                                </div>

                                <div className="flex uppercase">
                                    <span className="font-bold shrink-0">Total</span>
                                    <span className="h-1 w-full bg-gray-200 my-auto mx-5"></span>
                                    <span className="ml-auto opacity-60 font-bold">{ money.format(cartItems.map((item) => parseFloat(item.value) * item.quantity).reduce((a,b) => a + b, 0) * (payment && payment.discount > 0 ? 1 - (payment.discount / 100) : 1)) }</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 shadow-lg rounded-lg w-full">
                            <div className="section header mb-2">
                                <h1 className="font-bold">Forma de pagamento</h1>
                            </div>
                            
                            <div className="body flex flex-col gap-2">
                                {
                                    PAYMENT_METHODS.map((item) => {
                                        const isSelected = payment === item
                                        return <div onClick={() => setPayment(item)} className={`${  isSelected ? `bg-purple-500 text-white` : `bg-gray-100`} px-3 py-2 rounded-lg flex gap-3 cursor-pointer select-none`}>
                                            <div className={`logo w-12 ${ isSelected ? `brightness-0 invert` : `brightness-0` } my-auto`}>
                                                <img src={ item.logo } alt="" />
                                            </div>
                                            <div className="details my-auto">
                                                <p className="font-bold block">{ item.title }</p>
                                                { item.discount < 1 && <span>Sem descontos</span>}
                                                { item.discount > 0 && <span>Desconto de { item.discount }% - Pague apenas { money.format(cartItems.map((item) => parseFloat(item.value) * item.quantity).reduce((a,b) => a + b, 0) * (1 - (item.discount / 100))) } </span> }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>

                            <div className="footer mt-3">
                                <button disabled={!payment} onClick={() => alert("Contrata eu aê!")} className="disabled:opacity-60 px-3 py-3 rounded bg-purple-500 text-white font-bold w-full">Finalizar compra</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
    </Main>
}


export default Cart