import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route, Switch} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/cjs/Col";
import {Button} from "react-bootstrap";
import history from "../../../history";
import {injectIntl} from "react-intl";

class PrivacyPolicy extends Component {

    state = {}


    renderContent = () => {
        return (
            <div>
                asdf
            </div>
        )
    }

    renderPage = () => {
        const {intl} = this.props;
        return (
            <div className='administrative__detail-page'>
                <div className='inner-helper-page terms'>
                    <Container>
                        <Row>
                            <Col lg={8}>
                                <div className='back-link'>
                                    <Button
                                        variant="link"
                                        className="link cta_outline cta_outline__dark"
                                        onClick={() => {
                                            history.goBack()
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                "<spam class='mr-3'>" +
                                                "<svg width=\"65\" height=\"8\" viewBox=\"0 0 65 8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                                "<path d=\"M0.646446 3.64645C0.451187 3.84171 0.451187 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM65 3.5L1 3.5V4.5L65 4.5V3.5Z\" />\n" +
                                                "</svg>" +
                                                "</spam>"
                                                + intl.formatMessage({id: 'back'})
                                        }}>
                                    </Button>
                                </div>

                                <div className='inner-helper-page__title'>
                                    <h4 className='h4'>ОБЩИ УСЛОВИЯ <br/> ПРАВИЛА ЗА ПОЛЗВАНЕ НА САЙТА museumsmolyan.eu
                                    </h4>
                                </div>
                                <div className='inner-helper-page__text'>

                                    <div className='mt-5 mb-3'>
                                        <h4 className='h5'>1. Понятия</h4>
                                    </div>
                                    <p className='paragraph-3'>
                                        1.1. ДРУЖЕСТВОТО е Регионален исторически музей „Стою Шишков” – Смолян.
                                    </p>
                                    <p className='paragraph-3'>
                                        ДРУЖЕСТВОТО поддържа този сайт.
                                    </p>
                                    <p className='paragraph-3'>
                                        1.2. ПОЛЗВАТЕЛ е физическо лице, което визуализира на използваното от него
                                        устройство каквато и да е информация, поместена на сайта, от момента на
                                        визуализацията до момента на окончателно прекратяване на достъпа му до
                                        информацията.
                                    </p>
                                    <p className='paragraph-3'>
                                        1.3. IP АДРЕС е уникален идентификационен номер, позволяващ локализиране в
                                        интернет на компютър, интернет страница или ресурс.
                                    </p>
                                    <p className='paragraph-3'>
                                        1.4. ЕЛЕКТРОННА ПРЕПРАТКА представлява връзка, обозначена в интернет страница,
                                        която позволява автоматизирано препращане към друга интернет страница,
                                        информационен ресурс или обект чрез стандартизирани протоколи.

                                    </p>
                                    <p className='paragraph-3'>
                                        1.5. ИНФОРМАЦИЯ представлява както текстова информация (текст, в това число
                                        статии, новини, коментари, други подобни), така и мултимедийна информация
                                        (снимки, видео, аудио, други подобни).

                                    </p>
                                    <p className='paragraph-3'>
                                        1.6. УСЛУГИ БЕЗ РЕГИСТРАЦИЯ са тези услуги, за използването на които не се
                                        изисква ПОЛЗВАТЕЛЯТ да създава свой ПРОФИЛ.
                                    </p>
                                    <div className='mt-5 mb-3'>
                                        <h4 className='h5'>2. Кога се прилагат Правилата за ползване на сайта:</h4>
                                    </div>
                                    <p className='paragraph-3'>
                                        2.1. Правилата за ползване на сайта се прилагат по отношение на всяко лице
                                        (ПОЛЗВАТЕЛ) от момента, в който на използваното от него устройство се
                                        визуализира каквато и да е информация, поместена на сайта, до момента на
                                        окончателно прекратяване на достъпа му до информацията.

                                    </p>
                                    <p className='paragraph-3'>
                                        2.2. Лица, които не са съгласни да бъдат обвързани с настоящите Правила за
                                        ползване на сайта, нямат право да използват сайта и поместената на него
                                        информация.
                                    </p>
                                    <p className='paragraph-3'>
                                        2.3. Настоящите Правила за ползване на сайта могат да бъдат променяни.
                                        ПОЛЗВАТЕЛИТЕ се считат за обвързани с актуалния им текст към момента, в който на
                                        използваното от тях устройство се визуализира каквато и да е информация,
                                        поместена на сайта.
                                    </p>
                                    <div className='mt-5 mb-3'>
                                        <h4 className='h5'>3. Права на интелектуална собственост
                                        </h4>
                                    </div>
                                    <p className='paragraph-3'>
                                        3.1. Правата на интелектуална собственост по отношение на поместените на сайта
                                        обекти на права принадлежат на техните носители. Всяко неправомерно използване
                                        на такива обекти ще бъде считано за нарушение на права и може да доведе до
                                        ангажиране на гражданска или наказателна отговорност.
                                    </p>
                                    <p className='paragraph-3'>
                                        3.2. Конкретно, без изричното съгласие на носителя на правото трето лице,
                                        включително ПОЛЗВАТЕЛ на сайта, няма право да:
                                    </p>
                                    <p className='paragraph-3'>
                                        3.2.1. по отношение на компютърна програма: да я използва, да я зарежда, да я
                                        изобразява върху екран, да я изпълнява, да я предава на разстояние, да я
                                        съхранява в паметта на компютър, да я превежда, преработва и да внася други
                                        изменения в нея, т.н.

                                    </p>
                                    <p className='paragraph-3'>
                                        3.2.2. по отношение на обект на авторски и сродни права: да го записва, да го
                                        възпроизвежда, да го разпространява, да го излъчва или предава, да го използва
                                        по друг начин, или да извършва посочените действия с екземпляри от него, т.н.
                                    </p>
                                    <p className='paragraph-3'>
                                        3.3. "Интелектуална собственост" включва правата отнасящи се до: литературни,
                                        художествени и научни произведения; изпълнения на артисти-изпълнители,
                                        звукозаписи и радио- и телевизионни предавания; изобретения във всички области
                                        на човешката дейност; научни открития; промишлени образци; търговски марки,
                                        марки за услуги, търговски наименования и обозначения; закрила срещу нелоялна
                                        конкуренция, както и всички други права, произтичащи от интелектуална дейност в
                                        промишлената, научната, литературната и художествената област.
                                    </p>
                                    <div className='mt-5 mb-3'>
                                        <h4 className='h5'>4. Услуги без регистрация
                                        </h4>
                                    </div>
                                    <p className='paragraph-3'>
                                        4.1. Всеки ПОЛЗВАТЕЛ има право да ползва сайта и поместената на него информация
                                        единствено по следния начин:
                                    </p>
                                    <p className='paragraph-3'>
                                        4.1.1. да възприема визуално или звуково поместената на сайта информация;

                                    </p>
                                    <p className='paragraph-3'>
                                        4.1.2. да препредава текстова информация в резюме като посочва, че източник е
                                        сайтът и поставя ЕЛЕКТРОННА ПРЕПРАТКА към пълната информация на сайта.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.1.3. да препредава мултимедийна информация (снимки, видео, аудио, други
                                        подобни) само след предварително изрично разрешение на ДРУЖЕСТВОТО.

                                    </p>
                                    <p className='paragraph-3'>
                                        4.1.4. да поставя ЕЛЕКТРОННА ПРЕПРАТКА (хиперлинк) към сайта.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.1.5. да прави и запазва копие от информация в електронен или на твърд носител
                                        за свое лично ползване, с нетърговска цел и в разумен обем.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.1.6. да изразява лично мнение (коментар) относно поместените на интернет
                                        страницата статии.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.2. Ползване на информация, независимо от вида му, не може да бъде считано за
                                        предоставяне на упражняването на каквито и да е било права.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.3. При препредаване на информация и при копиране или запазване на копие от
                                        информация ПОЛЗВАТЕЛЯТ е длъжен да посочва, че информацията се ползва при
                                        ограниченията в настоящите Правила за ползване.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.4. ПОЛЗВАТЕЛЯТ се задължава да не използва сайта или поместената на него
                                        информация, включително чрез информацията, която помества на сайта (независимо
                                        от вида й – текст, коментар, аудио, видео, т.н. ), по следните начини:
                                    </p>
                                    <p className='paragraph-3'>
                                        4.4.1. за пропагандиране или извършване на идеи и/или деяния, насочени към общественоопасни деяния, обявени от закона за наказуеми;
                                    </p>
                                    <p className='paragraph-3'>
                                        4.4.2. за пропагандиране на идеи и/или деяния, насочени към дискриминация, основана на пол, раса, народност, етническа принадлежност, човешки геном, гражданство, произход, религия или вяра, образование, убеждения, политическа принадлежност, лично или обществено положение, увреждане, възраст, сексуална ориентация, семейно положение, имуществено състояние, др.;
                                    </p>
                                    <p className='paragraph-3'>
                                        4.4.3. в нарушение на приложимото право, на обществения ред и общоприетите морални норми.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.4.4. по начин, който би могъл да се определи като неприемлив, включително, но не само чрез отправяне на обиди или клевети към трети лица.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.4.5. по начин, по който се разкриват лични данни на трето лице.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.4.6. за разпространяване на порнография или на еротично съдържание с участие на или предназначени за лице под 18 (осемнадесет) години или лице, което изглежда като такова.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.4.7. с търговска и / или рекламна цел, освен ако в сайта изрично не е посочено друго.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.4.8. чрез прикриване на самоличността си посредством използване на име на трето лице.
                                    </p>
                                    <p className='paragraph-3'>
                                        4.5. Всеки ПОЛЗВАТЕЛ се съгласява да получава електрони съобщения, свързани с ползването на услугата.
                                    </p>

                                    <div className='mt-5 mb-3'>
                                        <h4 className='h5'>5. Права и задължения на ДРУЖЕСТВОТО
                                        </h4>
                                    </div>
                                    <p className='paragraph-3'>
                                        5.1. ДРУЖЕСТВОТО предоставя услугите във вида, в който са. ДРУЖЕСТВОТО има право едностранно да променя услугите, които предоставя или да прекрати предоставянето им, без да уведомява за това ПОЛЗВАТЕЛИТЕ.
                                    </p>
                                    <p className='paragraph-3'>
                                        5.2. По искане на компетентен държавен орган в случаите и при реда, установени със закон, дружеството е длъжно да предостави данни относно ПОЛЗВАТЕЛ, включително лични данни.
                                    </p>
                                    <p className='paragraph-3'>
                                        5.3. В случай, че узнае или бъде уведомено, че ПОЛЗВАТЕЛ нарушава Правилата за ползване, дружеството предприема незабавни действия за преустановяване на нарушението.
                                    </p>
                                    <p className='paragraph-3'>
                                        5.4. ДРУЖЕСТВОТО има право:

                                    </p>
                                    <p className='paragraph-3'>
                                        5.4.1. да отказва или прекратява регистрация, да преустановява достъпа до информация или да премахва информация на ПОЛЗВАТЕЛ, в случай че е налице нарушение на Правилата на ползване, както и в случай, че е направено искане за това от компетентен орган, или че трето лице твърди, че ПОЛЗВАТЕЛ или поместена от него информация нарушава Правилата за ползване и ДРУЖЕСТВОТО прецени, че твърдението може да е основателно;
                                    </p>
                                    <p className='paragraph-3'>
                                        5.4.2. да изпраща електронна поща до РЕГИСТРИРАН ПОЛЗВАТЕЛ, когато той е дал съгласие да получава съобщения на посочения от него електронен адрес или това е необходимо във връзка с използването на УСЛУГАТА С РЕГИСТРАЦИЯ.
                                    </p>

                                    <div className='mt-5 mb-3'>
                                        <h4 className='h5'>
                                            6. Декларации:
                                        </h4>
                                    </div>
                                    <p className='paragraph-3'>
                                        6.1. Всеки ПОЛЗВАТЕЛ декларира, че съзнава, че информацията, поместена на сайта:

                                    </p>
                                    <p className='paragraph-3'>
                                        6.1.1. следва да се приема критично независимо от източника й;

                                    </p>
                                    <p className='paragraph-3'>
                                        6.1.2. може да съдържа субективно отношение на автора или на трето лице;

                                    </p>
                                    <p className='paragraph-3'>
                                        6.1.3. съществува вероятност да не е изцяло или отчасти точна или пълна;
                                    </p>
                                    <p className='paragraph-3'>
                                        6.1.4. съществува вероятност да не е актуална към момента, в който се възприема от ПОЛЗВАТЕЛЯ.
                                    </p>

                                    <div className='mt-5 mb-3'>
                                        <h4 className='h5'>
                                            7. Ограничаване на отговорност от страна на ДРУЖЕСТВОТО
                                        </h4>
                                    </div>
                                    <p className='paragraph-3'>
                                        7.1. ДРУЖЕСТВОТО не дължи на ПОЛЗВАТЕЛ или на трето лице каквито и да е било обезщетения в случай:
                                    </p>
                                    <p className='paragraph-3'>
                                        7.1.1. на вреди (независимо от вида им), настъпили при действия или бездействия на увреденото лице или на трето лице в резултат на предприемане на поведението на някое от лицата, съобразено с информация, поместена на сайта;

                                    </p>
                                    <p className='paragraph-3'>
                                        7.1.2. на вреди (независимо от вида им), възникнали във връзка с използване на друг ресурс в интернет, към който води интерактивна връзка от този сайт;

                                    </p>
                                    <p className='paragraph-3'>
                                        7.1.3. че устройството, чрез което се ползва сайта, бъде увредено от компютърна програма, която се разпространява автоматично и против волята или без знанието на ползващите компютърните системи лица и е предназначена за привеждане на компютърни системи или компютърни мрежи в нежелани от ползващите ги състояния или в осъществяване на нежелани резултати;
                                    </p>
                                    <p className='paragraph-3'>
                                        7.1.4. на вреди (независимо от вида им), възникнали във връзка със загуба на информация, поместена от ПОЛЗВАТЕЛЯ на сайта, включително, но не само при прекратена регистрация или при ограничен или прекратен достъп до цялата или част от информацията на ПОЛЗВАТЕЛ.
                                    </p>
                                    <p className='paragraph-3'>
                                        7.3. ДРУЖЕСТВОТО не отговаря за съдържанието на информацията или за дейността на ПОЛЗВАТЕЛ.

                                    </p>
                                    <p className='paragraph-3'>
                                        7.4. ДРУЖЕСТВОТО не е длъжно да извършва наблюдение на информацията на ПОЛЗВАТЕЛ, която съхранява, пренася или прави достъпна при предоставяне на УСЛУГА С ИЛИ БЕЗ РЕГИСТРАЦИЯ, нито да търси факти и обстоятелства, указващи извършването на неправомерна дейност.
                                    </p>

                                    <div className='mt-5 mb-3'>
                                        <h4 className='h5'>8. Приложимо право
                                        </h4>
                                    </div>
                                    <p className='paragraph-3'>
                                        8.1. Всеки спор относно действието на настоящите Правила за ползването на сайта или във връзка с тях, или с тяхното нарушаване, включително споровете и разногласията относно действителността, тълкуването, прекратяването, изпълнението или неизпълнението на задължения на страните, ще се уреждат от страните по приятелски начин. При непостигане на съгласие спорът ще се отнася за решаване пред съответния родово компетентен съд в гр. София по реда на Гражданския процесуален кодекс.

                                    </p>
                                    <p className='paragraph-3'>
                                        8.2. Решение от компетентен съд или изменение на законодателството, което прави някое от условията на тези Правила за ползването на сайта невалидно, недействително или неизпълнимо, ще се отнася само до това условие и няма да прави никое друго условие невалидно, недействително или неизпълнимо и всички други условия ще останат в пълна сила и ефект, доколкото не са повлияни съществено от изменението.

                                    </p>
                                    <p className='paragraph-3'>
                                        8.3. За всички неуредени въпроси се прилагат разпоредбите на българското гражданско законодателство.
                                    </p>

                                    <div className='mt-5 mb-3'>
                                        <h4 className='h5'>9. Кореспонденция
                                        </h4>
                                    </div>
                                    <p className='paragraph-3'>
                                        9.1. ДРУЖЕСТВОТО поддържа електронна поща, на която всеки ПОЛЗВАТЕЛ има право да сигнализира за констатирани нарушения на Правилата за ползване от страна на трето лице.
                                    </p>
                                    <p className='paragraph-3'>
                                        9.2. В случай, че съобщението на ПОЛЗВАТЕЛЯ е свързано с извършване на каквито и да е правни действия, включително, но не само с упражняване на права, с изпълнение на задължения, с отправяне на покана и други подобни или в случай, че достигането му до ДРУЖЕСТВОТО е от съществено значение или в случай че се желае получаване на отговор, то съобщението следва да бъде изпратено на адреса на управление на ДРУЖЕСТВОТО, вписан в търговския регистър към момента на изпращането му. Изпращането на съобщение по електронен път не е равнозначно и не замества писменото съобщение, изпратено на адреса на управление на ДРУЖЕСТВОТО.

                                    </p>

                                </div>
                                <div className='inner-helper-page__author_wrap'>
                                    <p className='h-sup'>{this.state.date}</p>
                                    <div className='inner-helper-page__author'>
                                        <h5 className='h5'>{this.state.author ? `${this.state.author},` : null} <br/>
                                            {this.state.authorTitle}
                                        </h5>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }

    render() {
        const {intl} = this.props;
        return (
            <Switch>
                <Route path='/terms' exact component={this.renderPage}/>
            </Switch>

        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

export default injectIntl(connect(
    mapStateToProps,
    {}
)(PrivacyPolicy));