import { Main } from '@/components/Main/Main.js'
import { API } from '@/shared/requests/instances/api.js'
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react'
import Lottie from 'react-lottie'
import initialLottie from "@/assets/lotties/83567-adiing-e-commerce.json"
import planeLottie from "@/assets/lotties/eg7LkmNhlp.json"
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/cart.slice.js';
import { money } from '@/shared/misc/moneyFormat.js';


import 'swiper/css';
import Head from 'next/head.js';



export default function Home() {
  const [ products, setProduct ] = React.useState(null)
  const [ error, setError ] = React.useState(false)
  const dispatch = useDispatch()
  const getProducts = () => API.get(`/products`).then(res => setProduct(res.data)).catch(e => setError(`Oops! Houve um problema ao exibir nossos produtos.`))
  
  const toggleFavourite = async (item) => {
    const res = await API.put(`/products/${ item.id }`, { favorite: !item.favorite })
    const content = [...products]
    const index = content.indexOf(item)
    content[index].favorite = !item.favorite
    setProduct(content)
  }


  React.useEffect(() => {
    const randomTimeout = Math.random() * (3000 - 1200) + 1200
    setTimeout(() => getProducts(), randomTimeout)
  }, [])
  
  return <Main>
    <Head>
      <title>e-Commerce do João</title>
      <meta name="description" content="Compre seu produto com frete grátis e divida em até 12x" />
      <meta name="keywords" content="Produto, Camisa, Camiseta, loja, virtual" />
      <meta name="author" content="Gabriel Albuquerque" />
    </Head>
    
    <div className="content">
      <div className="banners flex flex-col xl:flex-row gap-3 mb-10">
        <div className="header shrink-0 flex flex-col xl:flex-row gap-3 px-5 py-3  rounded-lg shadow-lg bg-gray-50 xl:w-2/3">
          <div className="xl:w-1/3 shrink-0">
            <Lottie isClickToPauseDisabled={true} options={{
                loop: true,
                autoplay: true, 
                animationData: initialLottie,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
            />
          </div>

          <div className="w-full my-auto xl:w-2/3">
              <span className="px-2 rounded-full text-sm bg-purple-200 text-purple-600 uppercase font-bold">Novidade</span>
              <h1 className="font-bold text-3xl font-sans mb-3">Compre online e receba na sua casa!</h1>
              <p className="truncate-3 text-justify opacity-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id sapien a sapien gravida sagittis nec et mauris. Maecenas turpis mi, vestibulum in massa vitae, vulputate viverra urna. Donec hendrerit ex orci, eget condimentum nulla elementum eget. In dictum, lacus non ornare convallis, urna nisl condimentum est, eu pharetra diam lectus id lacus. Mauris non ligula posuere, convallis nisl et, egestas augue. Donec cursus et augue at lobortis. Integer sed tincidunt odio. Etiam sagittis, arcu sed laoreet pulvinar, ante risus cursus orci, vel efficitur sapien sem non est. Integer volutpat mi et turpis efficitur venenatis. Aliquam vel augue ut orci blandit ultrices a sed erat. Nulla facilisi.</p>
          </div>
        </div>

        <div className="bg-purple-500 px-5 py-5 rounded-lg w-full">
            <div className="lottie xl:w-2/3 mx-auto">
              <Lottie isClickToPauseDisabled={true} options={{
                  loop: true,
                  autoplay: true, 
                  animationData: planeLottie,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                  }
                }}
              />
            </div>

            <div className="caption text-center -mt-5">
              <h1 className="font-bold text-2xl xl:text-2xl text-white">Frete grátis em compras acima de R$ 10</h1>
            </div>
        </div>
      </div>


      {
        !products && (
          <div className="skeleton select-none">
            <div className="section-title">
              <h1 className="font-bold text-2xl loading mb-2">Carregando categorias...</h1> 
            </div>

            <div className="skeleton products flex gap-3">
              {
                Array(4).fill(1).map((item, key) => {
                  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 * key }} key={`product-skeleton-${ item }`} className={`${ key === 0 ? `flex`: `hidden`} px-4 py-5 xl:flex flex-col shrink-0 gap-4 rounded-lg mb-3 bg-purple-200/50 w-full xl:w-fit`}>
                    <div className="product w-full xl:w-64">
                      <div className="image xl:w-64 h-44 loading rounded-lg" />

                      <div className="details mt-2">
                        <span className="loading text-transparent rounded-lg uppercase font-bold text-xs px-3 py-0.5">Categoria</span>
                        <h1 className="font-bold font-sans text-xl truncate-1 loading my-1">Carregando produto</h1>
                        <p className="opacity-60 text-sm truncate-2 loading">Carregando descrição</p>

                        <div className="price mt-3 flex flex-col gap-2">
                          <h1 className="font-bold text-2xl loading">{ money.format(0) }</h1>
                          <div className="actions flex gap-2">
                            <button disabled className="loading px-3 py-2 rounded-lg bg-purple-200 text-purple-600 w-full font-bold">Adic. ao carrinho</button>
                            <button disabled className={`loading px-3 py-1 rounded-lg`}>
                              <i className="fas fa-heart"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                </motion.div>
                })
              }
            </div>
          </div>
        )
      }
      {
        products && (
          <div className="skeleton">
            <div className="section-title">
              <h1 className="font-bold text-2xl mb-2">Camisas e jaquetas</h1> 
            </div>

            <div className="section-products flex gap-3 flex-wrap">
              {
                products && (
                  <Swiper className="pb-3 gap-3" spaceBetween={5} slidesPerView={'auto'}>
                  {
                      products.map((product, key) => {
                      return <SwiperSlide key={product.id}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.10 * key}} className="px-4 py-5 flex flex-col shrink-0 gap-4 rounded-lg bg-gray-50 shadow mb-3">
                          <motion.div  className="product w-full xl:w-64">
                            <div className="image">
                              <img className="w-full rounded-lg" src={product.image}></img>
                            </div>

                            <div className="details mt-2">
                              <span className="bg-purple-200 text-purple-600 rounded-lg uppercase font-bold text-xs px-3 py-0.5">{ product.product }</span>
                              <h1 className="font-bold font-sans text-xl truncate-1">{ product.name }</h1>
                              <p className="opacity-60 text-sm truncate-2">{ product.description }</p>

                              <div className="price mt-3 flex flex-col gap-2">
                                <h1 className="font-bold text-2xl">{ money.format(product.value) }</h1>
                                <div className="actions flex gap-2">
                                  <button className="px-3 py-2 rounded-lg bg-purple-200 text-purple-600 w-full font-bold" onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}>Adic. ao carrinho</button>
                                  <button onClick={() => toggleFavourite(product)} className={`${ product.favorite ? `bg-red-200 text-red-600` : `bg-gray-200 text-gray-400` } px-3 py-1 rounded-lg`}>
                                    <i className="fas fa-heart"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                          </motion.div>
                        </SwiperSlide>
                    })
                  }
              </Swiper>
                )
            }
            </div>
          </div>
        )
      }
    </div>
  </Main>
}
