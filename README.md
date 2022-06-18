# Web-ресурс «Help&Manual» - руководство пользователя online.

Web-ресурс предназначен для постоянного и быстрого доступа к информации, а так же удобства пользования в любое время.

Функционал web-ресурса носит характер справочной информации и может быть использован как внутриорганизационный информационный ресурс, так и в глобальной сети интернет.

Постановка задачи и план работы.

Создать web-ресурс руководство пользователя формата online. Ресурс должен иметь навигацию по разделам оглавления. Иметь интуитивно понятный интерфейс.

Реализован общий интерфейс главной страницы.

Главная страница состоит из нескольких частей:
	1) панель инструментов;
	2) панель навигации - оглавление;
	3) панель тема топика - контент текста.

Панель инструментов:
	- кнопка «Обзор» - делает активной, переключается на вкладку «Тема»;
	- кнопка «Слова» - делает активной, переключается на вкладку «Ключевые слова» или создает вкладку, если она была закрыта;
	- кнопка «Поиск» - делает активной, переключается на вкладку «Поиск» или создает вкладку, если она была закрыта;
	- кнопка «Показать/Скрыть» - отображает/скрывает баннер компании;
	- кнопка «Развернуть/Свернуть» - разворачивает/сворачивает скрытый контент в текущей теме;
	- кнопка «Постоянная ссылка» - копирование/добавление в закладки ссылки на текущую тему;
	- кнопка «E-mail» - выводит в браузере предложение стандартного запроса выбора приложения для открытия почтового отправителя;
	- кнопка «Домой» - переход в текущую главу/раздел/подраздел темы;
	- кнопка «Назад» - переход на предыдущую тему;
	- кнопка «Вперед» - переход на следующую тему.

Панель навигации:
	- реализована возможность скрывать/отображать панель;
	- реализована возможность сворачивать/разворачивать оглавление:
    	1) древовидный вид списка имеет опцию: режим "по умолчанию" и режим режим "текущий пункт";
    	2) создана кнопка "развернуть/свернуть все оглавление".

Панель тема топика - контент текста:
	- меню вкладок;
	- есть возможность переключения между вкладками;
	- можно закрывать и открывать вкладки «Ключевые слова» и «Поиск».

В разработке/доработке:
	- остальные кнопки на панели инструментов:
    	1) кнопка «Быстрый поиск»;
    	2) кнопка «Открепить»;
    	3) кнопка «Новая вкладка»;
    	4) кнопка «Печать».
	- меню вкладок на панели тема топика. Пока что списк работает только для первых 3-х вкладок;
	- двойной клик на вкладках должен выполнять функцию кнопки «Открепить» для всех вкладок, кроме вкладки «Актуальная тема»:
    	1) вкладка «Ключевые слова»;
    	2) вкладка «Поиск»;
    	3) вкладки с темами, которые были созданы кнопкой «Новая вкладка».
	- ссылка «Комментарии» (возможно исключение из проекта);
	- кроссбраузерность и адаптация под планшеты и мобильные устройства.