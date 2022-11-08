import {Button, Container} from "@box/shared";
import {Header} from "@box/widgets";
import classNames from "classnames";
import Pattern from "@assets/shared/pattern.svg";
import DeskChair from "@assets/images/Desk Chair.png";
import Graduation from "@assets/images/Graduation.png";
import Notebook from "@assets/images/Notebook.png";
import Telescope from "@assets/images/Telescope.png";
import Bookmark from "@assets/icons/bookmark.svg";
import Clock from "@assets/icons/clock.svg";
import Team from "@assets/icons/team.svg";
import {useRouter} from "next/router";
import s from "./style.module.scss"
import Head from "next/head";



export default function Home() {
    const router = useRouter()
    return (
        <Container>
            <Head>
                <title>ВЭГУ</title>
            </Head>
            <Header/>
            <div className={classNames(s.header_banner, "gradient_background")}>
                <Pattern className={s.header_banner_background}/>
                <div className={classNames(s.header_banner_content)}>
                    <h1>Учим что-то новое прямо сегодня</h1>
                    <p>Станьте профессионалами и будьте готовы присоединиться к миру.</p>

                    <Button
                        preset={"light"}
                        className={s.header_banner_content_button}
                        size={"md"}
                        height={50}
                        onClick={() => router.push("/catalog")}
                    >
                        Начать обучение
                    </Button>
                </div>
            </div>
            <div className={s.block}>
                <h3 className={s.block_header}>Обучение с нами</h3>
                <div className={s.about_us_cards}>
                    <div className={s.about_us_cards_card}>
                        <img src={Telescope.src} alt=""/>
                        <div className="">
                            <h5>Профессии</h5>
                            <p>18 курсов</p>
                        </div>
                    </div>
                    <div className={s.about_us_cards_card}>
                        <img src={Notebook.src} alt=""/>
                        <div className="">
                            <h5>Курсы</h5>
                            <p>300 курсов</p>
                        </div>
                    </div>
                    <div className={s.about_us_cards_card}>
                        <img src={DeskChair.src} alt=""/>
                        <div className="">
                            <h5>Профессиональная
                                переподготовка</h5>
                            <p>300 курсов</p>
                        </div>
                    </div>
                    <div className={s.about_us_cards_card}>
                        <img src={Graduation.src} alt=""/>
                        <div className="">
                            <h5>Повышение квалификации</h5>
                            <p>300 курсов</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.block}>
                <h3 className={s.block_header}>Преимущества обучения с нами</h3>
                <div className={s.advantages_cards}>
                    <div className={s.advantages_cards_card}>
                        <Clock/>
                        <div className={s.advantages_cards_card_content}>
                            <h5>10 лет</h5>
                            <p>Опыт работы</p>
                        </div>
                    </div>
                    <div className={s.advantages_cards_card}>
                        <Team/>
                        <div className={s.advantages_cards_card_content}>
                            <h5>1000+</h5>
                            <p>Довольных учеников</p>
                        </div>
                    </div>
                    <div className={s.advantages_cards_card}>
                        <Bookmark/>
                        <div className={s.advantages_cards_card_content}>
                            <h5>918</h5>
                            <p>Курсов доступно</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.block}>
                <h3 className={s.block_header}>Отзывы наших учеников</h3>
            </div>
            <div className={s.footer}>
                <div className={classNames(s.footer_content, "gradient_background")}>
                    <Pattern className={s.footer_content_background} />
                    <div className={s.footer_content_text}>
                        <h3>Присоединяйся к нам! </h3>
                        <p>Множество полезных уроков</p>
                    </div>
                </div>
            </div>
        </Container>
    )
};
