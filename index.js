const { 
    Client, 
    GatewayIntentBits, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder, 
    Events, 
    REST, 
    Routes,
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    MessageFlags,
    parseEmoji,
    ActivityType,
    Collection,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    AuditLogEvent,
    ThreadAutoArchiveDuration,
    UserSelectMenuBuilder,
    ComponentType
} = require('discord.js');
const http = require('http');
const mongoose = require('mongoose');
const { joinVoiceChannel, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');

/**
 * ==============================================================================
 * 1. СЕРВЕР И КРАСИВЫЙ САЙТ (GLASSMORPHISM STYLE)
 * ==============================================================================
 */
const PORT = process.env.PORT || 10000;
http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consequence Bot | Premium Family Bot</title>
    <style>
        :root {
            --glass: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
            --accent: #5865F2;
        }
        body {
            margin: 0;
            padding: 0;
            background: radial-gradient(circle at top right, #1a1a2e, #0f0f0f, #000000);
            color: #fff;
            font-family: 'Inter', -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow-x: hidden;
        }
        .bg-blob {
            position: fixed;
            width: 400px;
            height: 400px;
            background: var(--accent);
            filter: blur(120px);
            border-radius: 50%;
            z-index: -1;
            opacity: 0.15;
            animation: move 20s infinite alternate;
        }
        @keyframes move {
            from { transform: translate(-20%, -20%); }
            to { transform: translate(20%, 20%); }
        }
        .container {
            background: var(--glass);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            padding: 50px;
            border-radius: 24px;
            text-align: center;
            max-width: 800px;
            width: 90%;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
            animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            background: linear-gradient(to right, #fff, #888);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800;
        }
        .description {
            font-size: 1.1rem;
            color: #b9bbbe;
            margin-bottom: 35px;
            line-height: 1.6;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .feature-card {
            background: rgba(255, 255, 255, 0.03);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid var(--glass-border);
            transition: 0.3s;
        }
        .feature-card:hover {
            background: rgba(255, 255, 255, 0.07);
            transform: translateY(-5px);
        }
        .feature-card h3 {
            margin: 0 0 10px 0;
            color: var(--accent);
            font-size: 1.1rem;
        }
        .feature-card p {
            font-size: 0.9rem;
            margin: 0;
            color: #8e9297;
        }
        .btn {
            display: inline-block;
            background: #fff;
            color: #000;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1rem;
            transition: 0.3s;
            box-shadow: 0 0 20px rgba(255,255,255,0.1);
        }
        .btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(255,255,255,0.2);
            background: var(--accent);
            color: #fff;
        }
        .status-badge {
            margin-top: 25px;
            font-size: 0.8rem;
            color: #43b581;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
        .dot { width: 8px; height: 8px; background: #43b581; border-radius: 50%; display: inline-block; box-shadow: 0 0 10px #43b581; }
    </style>
</head>
<body>
    <div class="bg-blob"></div>
    <div class="container">
        <h1>Consequence Bot</h1>
        <p class="description">
            Универсальное решение для управления семьей в Discord. <br> 
            Автоматизация процессов, система баллов и продвинутая модерация в одном боте.
        </p>
        
        <div class="features">
            <div class="feature-card">
                <h3>⛏️ Сборы</h3>
                <p>Автоматические уведомления и запись на подземную шахту.</p>
            </div>
            <div class="feature-card">
                <h3>💰 Финка</h3>
                <p>Умный график вывоза территорий и контроль отчетности.</p>
            </div>
            <div class="feature-card">
                <h3>☁️ Приватки</h3>
                <p>Гибкое управление личными голосовыми каналами.</p>
            </div>
        </div>

        <a href="https://discord.com/oauth2/authorize?client_id=1465229870215725236&permissions=8&integration_type=0&scope=bot" class="btn">Добавить на сервер</a>

        <div class="status-badge">
            <span class="dot"></span> Online & Operational
        </div>
    </div>
</body>
</html>
        `);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
    }
}).listen(PORT, '0.0.0.0', () => {
    console.log(`🌍 Веб-сервер запущен на порту ${PORT}`);
});

/**
 * ==============================================================================
 * 2. КОНФИГУРАЦИЯ (ID КАНАЛОВ И РОЛЕЙ)
 * ==============================================================================
 */
const ALLOWED_GUILDS = ['1465230913473478710', '1096080921427443832']; 
const AUTO_ROLE_ID = '1391087961088721047'; 
const MAIN_CHANNEL_ID = '1426174226464899163'; 
const MENTION_ROLE_ID = '1426222945705001262'; 
const WELCOME_CHANNEL_ID = '1391856427508830289'; 
const LOG_CHANNEL_ID = '1407346843372752927'; 
const LOG_RECIPIENT_ID = '915665525634375710'; 
const FKICK_LOG_CHANNEL_ID = '1475480065578897550'; 

const PRIVATE_CATEGORY_ID = '1464990614025408635';
let voiceTriggerId = '1477572106710679623'; 

const ADMIN_ROLES = [
    '1439024334491357325', '1096373072887566348', 
    '1426186403758215240', '1392634969225957500', 
    '1426222521283510373'
]; 

const DEVELOPER_ID = '915665525634375710'; // ID разработчика для команды /sb

const TARGET_HOUR = 20;    
const TARGET_MINUTE = 10;  
const UTC_OFFSET = 3;     

const FINKA_TARGET_HOUR = 23;    
const FINKA_TARGET_MINUTE = 10;  
const FINKA_MENTION_ROLE_ID = '1465231255116189811';
const FINKA_ALLOWED_ROLES = ['1465231255116189811', '1465231255116189811'];
const FINKA_CHART_CHANNEL_ID = '1476625883744702694';

/**
 * ==============================================================================
 * 2.1 МОДЕЛЬ И РАБОТА С БАЗОЙ ДАННЫХ
 * ==============================================================================
 */
// --- FINKA SCHEMA ---
const finkaSchema = new mongoose.Schema({
    configId: { type: String, default: 'global' },
    lastPayMessageId: String
});

const FinkaModel = mongoose.model('FinkaData', finkaSchema);

// --- FINKA VARIABLES ---
let lastPayMessageId = null;

async function loadFinkaData() {
    try {
        let data = await FinkaModel.findOne({ configId: 'global' });
        if (!data) {
            data = await FinkaModel.create({ configId: 'global' });
        }
        lastPayMessageId = data.lastPayMessageId;
        console.log(`✅ Данные загружены из MongoDB.`);
    } catch (e) {
        console.error("❌ Ошибка загрузки данных:", e);
    }
}

async function saveFinkaData() {
    try {
        await FinkaModel.updateOne(
            { configId: 'global' },
            { lastPayMessageId },
            { upsert: true }
        );
        console.log("💾 Данные сохранены в MongoDB");
    } catch (e) {
        console.error("❌ Ошибка сохранения данных:", e);
    }
}

/**
 * ==============================================================================
 * 3. ИНИЦИАЛИЗАЦИЯ КЛИЕНТА
 * ==============================================================================
 */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildModeration 
    ]
});

const privateVoices = new Collection();
const scriptCache = new Collection(); // КЭШ ДЛЯ СКРИПТОВ
const leaveCooldowns = new Collection(); // КЭШ ДЛЯ КД ПОСЛЕ ВЫХОДА
let lastPicMessageId = null; 

/**
 * ==============================================================================
 * 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
 * ==============================================================================
 */
async function sendChannelLog(guild, embed) {
    if (!guild) return;
    const channel = guild.channels.cache.get(LOG_CHANNEL_ID);
    if (channel) {
        try { await channel.send({ embeds: [embed] }); } catch (e) { console.error("Log error:", e.message); }
    }
}

function getEmojiData(emojiInput) {
    if (!emojiInput) return '⛏️';
    if (typeof emojiInput === 'object') return emojiInput.id || emojiInput.name;
    try {
        const parsed = parseEmoji(emojiInput);
        if (parsed) return parsed.id ? parsed.id : parsed.name;
    } catch (e) { return emojiInput; }
    return emojiInput;
}

function createPickEmbed(usersCount = 0, participantsArray = [], maxSlots = 6, customText = '# ⛏️ **Подземная Шахта**\n\nОткрылась пикалка на подземную шахту.', btnLabel = 'Записаться', btnEmoji = '⛏️') {
    const isFull = usersCount >= maxSlots;
    let participantsString = participantsArray.length > 0 
        ? participantsArray.map((user, index) => `${index + 1}. ${user}`).join('\n') 
        : 'Пока никого...';

    const embed = new EmbedBuilder()
        .setDescription(customText)
        .setColor(isFull ? '#FF0000' : '#2F3136')
        .addFields({ name: 'Список участников:', value: participantsString });

    const button = new ButtonBuilder()
        .setCustomId(`btn_${maxSlots}`) 
        .setEmoji(isFull ? '🚫' : getEmojiData(btnEmoji))
        .setStyle(isFull ? ButtonStyle.Secondary : ButtonStyle.Primary)
        .setDisabled(isFull)
        .setLabel(isFull ? 'Набор завершён' : (btnLabel || 'Записаться'));

    const buttonLeave = new ButtonBuilder()
        .setCustomId(`btnleave_${maxSlots}`)
        .setEmoji('🚪')
        .setStyle(ButtonStyle.Danger)
        .setLabel('Выйти');

    const row = new ActionRowBuilder().addComponents(button, buttonLeave);
    return { embeds: [embed], components: [row] };
}

/**
 * Функция для подключения бота к голосовому каналу по команде
 */
function connectToVoice(channel) {
    if (!channel) return;

    try {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false
        });

        connection.on('error', error => {
            console.error('Voice Connection Error:', error);
        });

        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            try {
                await Promise.race([
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
                ]);
            } catch (error) {
                // В этой версии мы не переподключаемся автоматически
            }
        });
    } catch (e) {
        console.error("Voice connection error:", e);
    }
}

/**
 * ==============================================================================
 * 5. ОБРАБОТКА СОБЫТИЙ СООБЩЕНИЙ (ЛОГИ, КОМАНДЫ)
 * ==============================================================================
 */
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot || !message.guild) return;

    // Текстовые команды через префикс 'f'
    if (message.content.startsWith('f ')) {
        const args = message.content.slice(2).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const isAdmin = ADMIN_ROLES.some(r => message.member.roles.cache.has(r)) || message.member.permissions.has(PermissionFlagsBits.Administrator);
        if (!isAdmin) return;

        if (command === 'rules') {
            const embed = new EmbedBuilder()
                .setColor('#FF69B4') 
                .setDescription('📜 **Правила подземной шахты:**\n\n1.1 Запрещено оскорблять, провоцировать или мешать другим игрокам во время добычи ресурсов/совместного убийства посторонних.\n1.2 Любые конфликты решаются внутри семьи, через руководство. Категорически запрещено выносить их на публику.\n1.3 Игроки, игнорирующие правила шахты, штрафуются ТОЛЬКО по решению лидера семьи.\n1.4 В шахте ценится коллективная работа: при возможности помогать друг другу с ресурсами, и деффа от посторонних.\n1.5 Кто берет слот и не заходит 15кк отдает, а не тот человек который отдавал слот\n\n💗 **Ежедневый процент с шахты 15.ООО.ООО - Кидать на банк семьи(/fammenu)**');
            
            await message.channel.send({ embeds: [embed] });
            await message.delete().catch(() => {});
        }

        if (command === 'info') {
            const embed = new EmbedBuilder()
                .setColor('#FF69B4') 
                .setDescription('# **⛏️ Информация для новых шахтеров:**\n\n**💎 [Самый правый, 0 отсек]** - называется "Алмазка" \n**🪲 [По прямой, 3 отсек]** - называется "Клоповник"\n**👥 [По прямой-вправо, 2-4 отсеки]** называются "Двойным отсеком"\n-# Изображено на карте (расположение и названия каждого из отсеков)\n\n# **🔖 Некие условия, для входа на шахту**\n\n1. **Ходить всегда with сетом,  со своим или арендованным.** _Чтобы максимально фармить берите "Майн-скелет" + Охранника +11-22% к x2 ресам_\n2. **У нас есть своеобразная комка с ресурсов для расходов фаме "15кк" - каждая шахта,** _если не оплатишь то __x2 будешь отдавать__! (оплата на банк семьи [/fammenu])_\n3. **Каждый день, после шахты, в 20:10 в канале "Пикалка" будет открываться пикалка на шахту.** _Если словил - __идешь__, если НЕ словил - __не идешь___\n**Ресы у друг - друга не пиздим,** _если что-то не поделили - отписывайте руководству семьи_\n4. **Если надо будет деффать шахту, залетаете без всяких нюней.** _Если не можете - __отписывайте___\n\n5. Если банит **айпи** пишем админам, чтобы они разбанили айпи!\nЕсли из __УКР__ и нету доступа в VK пишите мне(<@937400997452591165>), буду туда им писать (от вас: сказать кому писать, ваш айпи)');
            
            await message.channel.send({ embeds: [embed] });
            await message.delete().catch(() => {});
        }
    }
});

client.on(Events.MessageDelete, async (message) => {
    if (!message.guild || message.author?.bot) return;
    const embed = new EmbedBuilder()
        .setTitle('🗑️ Сообщение удалено')
        .setColor('#FF0000')
        .addFields(
            { name: 'Автор', value: `${message.author.tag} (<@${message.author.id}>)`, inline: true },
            { name: 'Канал', value: `<#${message.channel.id}>`, inline: true },
            { name: 'Текст', value: message.content || '*[Файл/Пусто]*' }
        ).setTimestamp();
    await sendChannelLog(message.guild, embed);
});

client.on(Events.MessageUpdate, async (oldM, newM) => {
    if (!oldM.guild || oldM.author?.bot || oldM.content === newM.content) return;
    const embed = new EmbedBuilder()
        .setTitle('✏️ Сообщение изменено')
        .setColor('#FFFF00')
        .addFields(
            { name: 'Автор', value: oldM.author.tag, inline: true },
            { name: 'Было', value: oldM.content || '*Пусто*' },
            { name: 'Стало', value: newM.content || '*Пусто*' }
        ).setTimestamp();
    await sendChannelLog(oldM.guild, embed);
});

client.on(Events.GuildMemberAdd, async (member) => {
    const embed = new EmbedBuilder().setTitle('📥 Вход').setColor('#00FF00').setThumbnail(member.user.displayAvatarURL())
        .addFields({ name: 'Пользователь', value: `${member.user.tag}` }, { name: 'Создан', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>` }).setTimestamp();
    await sendChannelLog(member.guild, embed);
});

client.on(Events.GuildMemberRemove, async (member) => {
    let executor = null;
    try {
        const fetchedLogs = await member.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberKick });
        const kickLog = fetchedLogs.entries.first();
        if (kickLog && kickLog.target.id === member.id && kickLog.createdTimestamp > (Date.now() - 5000)) executor = kickLog.executor;
    } catch (e) {}

    const embed = new EmbedBuilder().setThumbnail(member.user.displayAvatarURL()).setTimestamp();
    if (executor) {
        embed.setTitle('👢 Кикнут').setColor('#FFA500').addFields({ name: 'Кого', value: member.user.tag }, { name: 'Кто', value: executor.tag });
    } else {
        embed.setTitle('📤 Вышел').setColor('#8B0000').setDescription(`${member.user.tag} покинул сервер.`);
    }
    await sendChannelLog(member.guild, embed);
});

client.on(Events.GuildMemberUpdate, async (oldM, newM) => {
    const guild = newM.guild;
    if (oldM.nickname !== newM.nickname) {
        const embed = new EmbedBuilder().setTitle('🏷️ Ник').setColor('#9400D3').addFields({ name: 'До', value: oldM.nickname || oldM.user.username }, { name: 'После', value: newM.nickname || newM.user.username }).setTimestamp();
        await sendChannelLog(guild, embed);
    }
    if (!oldM.isCommunicationDisabled() && newM.isCommunicationDisabled()) {
        let mod = "Неизвестно";
        try {
            const logs = await guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberUpdate });
            const entry = logs.entries.first();
            if (entry && entry.target.id === newM.id) mod = entry.executor.tag;
        } catch (e) {}
        const embed = new EmbedBuilder().setTitle('🤐 Тайм-аут').setColor('#4B0082').addFields({ name: 'Кому', value: `<@${newM.id}>` }, { name: 'До', value: `<t:${Math.floor(newM.communicationDisabledUntilTimestamp / 1000)}:R>` }, { name: 'Кто', value: mod }).setTimestamp();
        await sendChannelLog(guild, embed);
    }
});

/**
 * ==============================================================================
 * 6. ПРИВАТНЫЕ КАНАЛЫ
 * ==============================================================================
 */
client.on(Events.VoiceStateUpdate, async (oldS, newS) => {
    const guild = newS.guild || oldS.guild;
    const member = newS.member || oldS.member;
    if (!guild || !member) return;

    if (oldS.channelId && newS.channelId && oldS.channelId !== newS.channelId) {
        const embed = new EmbedBuilder().setTitle('🔄 Перенос').setColor('#1E90FF').setDescription(`<@${member.id}>: <#${oldS.channelId}> ➡️ <#${newS.channelId}>`).setTimestamp();
        await sendChannelLog(guild, embed);
    }

    if (newS.channelId === voiceTriggerId) {
        try {
            const priv = await guild.channels.create({
                name: `☁️ ${member.displayName}`,
                type: ChannelType.GuildVoice,
                parent: PRIVATE_CATEGORY_ID,
                permissionOverwrites: [
                    { id: guild.id, allow: [PermissionFlagsBits.Connect] },
                    { id: member.id, allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak, PermissionFlagsBits.MoveMembers, PermissionFlagsBits.ManageChannels] }
                ]
            });
            await member.voice.setChannel(priv);
            privateVoices.set(priv.id, member.id);
        } catch (e) { console.error("Create channel error:", e); }
    }

    const oldCh = oldS.channel;
    if (oldCh && (privateVoices.has(oldCh.id) || oldCh.name.startsWith('📞 Обзвон')) && oldCh.members.size === 0) {
        privateVoices.delete(oldCh.id);
        await oldCh.delete().catch(() => {});
    }
});

/**
 * ==============================================================================
 * 7. КОМАНДЫ И ГОТОВНОСТЬ
 * ==============================================================================
 */
client.once(Events.ClientReady, async (c) => {
    // Подключаемся к базе, но не даем ей "подвесить" запуск бота
    if (process.env.MONGODB_URI) {
        mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
            .then(async () => {
                console.log("Connected to MongoDB Atlas");
                await loadFinkaData();
            })
            .catch(err => console.error("MongoDB Connection Error (Non-fatal):", err));
    } else {
        console.error("❌ MONGODB_URI не настроен!");
    }

    console.log(`✅ Бот ${c.user.tag} запущен!`);
    
    const cmds = [
        new SlashCommandBuilder()
            .setName('fkick')
            .setDescription('Исключить участника из семьи (снять роль)')
            .addUserOption(o => o.setName('user').setDescription('Пользователь для исключения').setRequired(true)),
        new SlashCommandBuilder()
            .setName('setup_voice')
            .setDescription('Настроить панель управления приватками')
            .addChannelOption(o => o.setName('channel').setDescription('Выберите канал-триггер').setRequired(true).addChannelTypes(ChannelType.GuildVoice)),
        new SlashCommandBuilder()
            .setName('pic')
            .setDescription('Создать сбор на шахту')
            .addIntegerOption(o => o.setName('amount').setDescription('Количество мест').setRequired(true))
            .addStringOption(o => o.setName('text').setDescription('Текст сбора').setRequired(true))
            .addStringOption(o => o.setName('button_text').setDescription('Текст на кнопке').setRequired(true))
            .addStringOption(o => o.setName('emoji').setDescription('Эмодзи для кнопки').setRequired(true)),
        new SlashCommandBuilder()
            .setName('clear')
            .setDescription('Очистить сообщения в чате')
            .addIntegerOption(o => o.setName('amount').setDescription('Количество сообщений').setRequired(true)),
        new SlashCommandBuilder()
            .setName('clear_pic')
            .setDescription('Удалить участника из последнего сбора')
            .addUserOption(o => o.setName('user').setDescription('Кого исключить').setRequired(true)),
        new SlashCommandBuilder()
            .setName('setup_academy')
            .setDescription('Создать сообщение с заявкой в академию'),
        new SlashCommandBuilder()
            .setName('pay_list')
            .setDescription('Создать пустой список оплаты на сегодня'),
        new SlashCommandBuilder()
            .setName('pay_add')
            .setDescription('Добавить человека в список оплаты')
            .addUserOption(o => o.setName('user').setDescription('Пользователь').setRequired(true))
            .addStringOption(o => o.setName('status')
                .setDescription('Статус оплаты')
                .setRequired(true)
                .addChoices(
                    { name: '✅ Оплатил', value: '✅ Оплатил' },
                    { name: '❌ Не оплатил', value: '❌ Не оплатил' }
                )),
        new SlashCommandBuilder()
            .setName('send_script')
            .setDescription('whoinwell')
            .addAttachmentOption(o => o.setName('file').setDescription('Файл скрипта').setRequired(true))
            .addAttachmentOption(o => o.setName('screenshot').setDescription('Скриншот (необязательно)').setRequired(false))
            .setDefaultMemberPermissions(0),
        new SlashCommandBuilder()
            .setName('send_embed')
            .setDescription('Отправить кастомный эмбед')
            .addStringOption(o => o.setName('title1').setDescription('Заголовок 1'))
            .addStringOption(o => o.setName('desc1').setDescription('Описание 1'))
            .addStringOption(o => o.setName('title2').setDescription('Заголовок 2'))
            .addStringOption(o => o.setName('desc2').setDescription('Описание 2'))
            .addStringOption(o => o.setName('image_url').setDescription('Ссылка на картинку/гифку'))
            .addStringOption(o => o.setName('link').setDescription('Ссылка для кнопки'))
            .addStringOption(o => o.setName('link_text').setDescription('Название кнопки со ссылкой'))
            .addAttachmentOption(o => o.setName('file').setDescription('Прикрепить файл'))
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        new SlashCommandBuilder()
            .setName('sb') 
            .setDescription('Отправить сообщение с заявкой (можно указать роли для доступа)')
            .addChannelOption(o => o.setName('target_channel').setDescription('Канал для отправки сообщения').setRequired(true))
            .addRoleOption(o => o.setName('role1').setDescription('Роль 1 для доступа к кнопке').setRequired(false))
            .addRoleOption(o => o.setName('role2').setDescription('Роль 2 для доступа к кнопке').setRequired(false))
            .addRoleOption(o => o.setName('role3').setDescription('Роль 3 для доступа к кнопке').setRequired(false)),
        new SlashCommandBuilder()
            .setName('voice_join')
            .setDescription('Подключить бота к голосовому каналу (Только для разработчика)')
            .addChannelOption(o => o.setName('channel').setDescription('Выберите канал').setRequired(true).addChannelTypes(ChannelType.GuildVoice))
    ].map(cmd => cmd.toJSON());

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    try {
        await rest.put(Routes.applicationCommands(c.user.id), { body: cmds });
    } catch (e) { console.error('Ошибка регистрации команд:', e); }

    setInterval(() => {
        const now = new Date();
        const currentHour = (now.getUTCHours() + UTC_OFFSET) % 24;
        const currentMinute = now.getUTCMinutes();

        if (currentHour === TARGET_HOUR && currentMinute === TARGET_MINUTE) {
            client.channels.fetch(MAIN_CHANNEL_ID).then(async ch => {
                if (ch) {
                    const msg = await ch.send({ content: `<@&${MENTION_ROLE_ID}>`, ...createPickEmbed(0, [], 6, undefined, 'Пик слота') });
                    lastPicMessageId = msg.id;
                }
            }).catch(e => console.error("Auto-pick error:", e));
        }

        if (currentHour === FINKA_TARGET_HOUR && currentMinute === FINKA_TARGET_MINUTE) {
            client.channels.fetch(FINKA_CHART_CHANNEL_ID).then(async ch => {
                if (ch) {
                    const msg = await ch.send({ 
                        content: `<@&${FINKA_MENTION_ROLE_ID}>`, 
                        ...createPickEmbed(0, [], 3, '# 💰 **Сбор на финку**\n\nОткрылась пикалка на вывоз территорий.', 'Занять слот', '💰') 
                    });
                    lastPicMessageId = msg.id;

                    const embed = new EmbedBuilder()
                        .setTitle('💰 Схема вывоза финки')
                        .setImage('https://media.discordapp.net/attachments/1096080921427443835/1330983195244564500/image.png?ex=678fe04a&is=678e8eca&hm=f24f57545939223126f5d817f735d1f86877028710b71940da7c48f21789c622&=&format=webp&quality=lossless&width=961&height=671')
                        .setColor('#2F3136');
                    await ch.send({ embeds: [embed] }).catch(console.error);
                }
            }).catch(e => console.error("Auto-pick finka error:", e));
        }

    }, 60000);

    const statuses = [
        { name: 'consequence fam', type: ActivityType.Playing },
        { name: 'consequence fam', type: ActivityType.Listening }
    ];
    let si = 0;
    setInterval(() => {
        client.user.setPresence({ activities: [statuses[si]], status: 'dnd' });
        si = (si + 1) % statuses.length;
    }, 30000);
});

client.on(Events.InteractionCreate, async (i) => {
    
    if (i.isModalSubmit()) {
        
        if (i.customId.startsWith('fkick_modal_')) {
            await i.deferReply({ flags: [MessageFlags.Ephemeral] });

            const targetId = i.customId.split('_')[2];
            const nick = i.fields.getTextInputValue('fkick_nick');
            const reason = i.fields.getTextInputValue('fkick_reason');

            const targetMember = await i.guild.members.fetch(targetId).catch(() => null);

            if (targetMember) {
                try {
                    await targetMember.roles.set(['1391087961088721047']).catch(() => {});
                } catch (roleErr) {
                    console.error('Ошибка при смене ролей:', roleErr);
                }
            }

            const embed = new EmbedBuilder()
                .setTitle('👢 Исключение из семьи')
                .setColor('#FF0000')
                .addFields(
                    { name: 'Никнейм', value: nick, inline: true },
                    { name: 'Участник', value: `<@${targetId}>`, inline: true },
                    { name: 'Исключил', value: `<@${i.user.id}>`, inline: true },
                    { name: 'Причина', value: reason }
                )
                .setTimestamp();

            const logChannel = i.guild.channels.cache.get(FKICK_LOG_CHANNEL_ID);
            if (logChannel) {
                await logChannel.send({ embeds: [embed] });
            }

            await i.editReply({
                content: `✅ Роли пользователя успешно обновлены, лог отправлен.`
            });
            return;
        }

        if (i.customId === 'modal_subota') {
            await i.deferReply({ flags: [MessageFlags.Ephemeral] });
            
            const nick = i.fields.getTextInputValue('sub_nick');
            const slots = i.fields.getTextInputValue('sub_slots');
            const stats = i.fields.getTextInputValue('sub_stats');
            const missing = i.fields.getTextInputValue('sub_missing');
            const screen = i.fields.getTextInputValue('sub_screen');

            const embed = new EmbedBuilder()
                .setTitle('<a:cn_noted:1470526786898235584>  Новая заявка на получение помощи с сетом')
                .setColor('#FFA500')
                .setThumbnail(i.user.displayAvatarURL())
                .addFields(
                    { name: '<:cn_laptop:1470525914122158225> Никнейм', value: nick },
                    { name: '<:cn_book:1470525954706374766> Имеющиеся слоты', value: slots },
                    { name: '<:cn_search:1470521503161385120> Текущие статы', value: stats },
                    { name: '<:cn_cog:1470525945201823776> Чего не хватает', value: missing },
                    { name: '🖼️ Скриншот', value: screen }
                )
                .setFooter({ text: `Отправил: ${i.user.tag}`, iconURL: i.user.displayAvatarURL() })
                .setTimestamp();

            await i.channel.send({ embeds: [embed] });
            await i.editReply({ content: '✅ Ваша заявка успешно отправлена!' });
            return;
        }

        if (i.customId === 'academy_modal') {
            await i.deferReply({ flags: [MessageFlags.Ephemeral] });

            const name = i.fields.getTextInputValue('ac_name');
            const age = i.fields.getTextInputValue('ac_age');
            const nick = i.fields.getTextInputValue('ac_nick');
            const screen = i.fields.getTextInputValue('ac_screen');
            const goal = i.fields.getTextInputValue('ac_goal');

            try {
                const thread = await i.channel.threads.create({
                    name: `Заявка ${nick}`,
                    type: ChannelType.PrivateThread,
                    autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
                    reason: 'Новая заявка в академию'
                });

                await thread.members.add(i.user.id);
                await thread.members.add('915665525634375710').catch(() => {});
                
                const resultEmbed = new EmbedBuilder()
                    .setTitle('**Заявление передано на рассмотрение** <:cool_panda:1407388209184243823>')
                    .setDescription('<:4169crystalheartlightblue:1407417552463986688> **— Ты успешно оставил заявление на вступление, ожидай пока кто-то возьмет его на рассмотрение, после данного сообщения, ничего писать не нужно, только если тебе будут задавать вопросы!**')
                    .setColor(14793215)
                    .setThumbnail('https://i.pinimg.com/736x/52/18/e9/5218e9a1fe3cf5c3672bd3f78601cd8b.jpg')
                    .addFields(
                        { name: '👤 Имя', value: name, inline: true },
                        { name: '🔞 Возраст', value: age, inline: true },
                        { name: '🎮 Nick_Name', value: nick, inline: true },
                        { name: '📎 Скриншот смены ников', value: screen },
                        { name: '🎯 Цель вступления', value: goal }
                    );

                const adminRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId('ac_take').setLabel('Взять на рассмотрение').setStyle(ButtonStyle.Success),
                    new ButtonBuilder().setCustomId(`ac_call_${i.user.id}`).setLabel('Вызвать на обзвон').setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId(`ac_approve_${i.user.id}`).setLabel('Одобрить').setStyle(ButtonStyle.Success),
                    new ButtonBuilder().setCustomId('ac_deny').setLabel('Отказать').setStyle(ButtonStyle.Danger),
                    new ButtonBuilder().setCustomId('ac_close').setLabel('Закрыть').setStyle(ButtonStyle.Secondary)
                );

                const MENTION_USERS = [
                    '527578128168648705', '1357410939795935272', 
                    '378196862408327178', '664431601438031873', 
                    '1258679368558055445', '1076842068946731040'
                ];
                const mentions = MENTION_USERS.map(id => `<@${id}>`).join(' ');

                await thread.send({ content: `Новая заявка от <@${i.user.id}>\n${mentions}`, embeds: [resultEmbed], components: [adminRow] });
                await i.editReply({ content: `✅ Ваша заявка создана: <#${thread.id}>` });

            } catch (e) {
                console.error(e);
                await i.editReply({ content: '❌ Ошибка при создании заявки. Проверьте права бота.' });
            }
            return;
        }

        if (i.customId === 'modal_script_desc') {
            const cachedData = scriptCache.get(i.user.id);
            if (!cachedData) return i.reply({ content: '❌ Время ожидания истекло или данные утеряны.', flags: [MessageFlags.Ephemeral] });

            const description = i.fields.getTextInputValue('script_desc_text');
            const { file, screenshot } = cachedData;

            await i.deferReply({ flags: [MessageFlags.Ephemeral] });

            const scriptEmbed = new EmbedBuilder()
                .setTitle('🚀 Новая версия скрипта')
                .setDescription(description)
                .setColor('#00CCFF')
                .addFields({ name: 'Название файла', value: `\`${file.name}\`` })
                .setTimestamp();

            if (screenshot) {
                scriptEmbed.setImage(screenshot.url);
            }

            const downloadRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('Скачать скрипт')
                    .setStyle(ButtonStyle.Link)
                    .setURL(file.url)
                    .setEmoji('📥')
            );

            await i.channel.send({ embeds: [scriptEmbed], components: [downloadRow] });
            scriptCache.delete(i.user.id);
            await i.editReply({ content: '✅ Скрипт успешно опубликован!' });
            return;
        }

        if (i.customId === 'ml') {
            const chId = privateVoices.findKey(v => v === i.user.id);
            const ch = i.guild.channels.cache.get(chId);
            const val = parseInt(i.fields.getTextInputValue('v'));
            if (ch && !isNaN(val)) {
                await ch.setUserLimit(val);
                await i.reply({ content: `Лимит: ${val}`, flags: [MessageFlags.Ephemeral] });
            }
        }
    }

    if (i.isChatInputCommand()) {
        if (i.commandName === 'fkick') {
            const isAdmin = ADMIN_ROLES.some(r => i.member.roles.cache.has(r)) || i.member.permissions.has(PermissionFlagsBits.Administrator);
            if (!isAdmin) return i.reply({ content: '⛔ У вас нет доступа к этой команде.', flags: [MessageFlags.Ephemeral] });

            const targetUser = i.options.getUser('user');

            const modal = new ModalBuilder()
                .setCustomId(`fkick_modal_${targetUser.id}`)
                .setTitle('Исключение участника из семьи');

            const nickInput = new TextInputBuilder()
                .setCustomId('fkick_nick')
                .setLabel('Nick_Name')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const reasonInput = new TextInputBuilder()
                .setCustomId('fkick_reason')
                .setLabel('Причина исключения')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(nickInput),
                new ActionRowBuilder().addComponents(reasonInput)
            );

            await i.showModal(modal);
            return;
        }

        if (i.commandName === 'voice_join') {
            if (i.user.id !== DEVELOPER_ID) {
                return i.reply({ content: '⛔ У вас нет доступа.', flags: [MessageFlags.Ephemeral] });
            }
            const channel = i.options.getChannel('channel');
            connectToVoice(channel);
            await i.reply({ content: `✅ Подключился к <#${channel.id}>`, flags: [MessageFlags.Ephemeral] });
            return;
        }

        if (i.commandName === 'sb') {
            if (i.user.id !== DEVELOPER_ID && !i.member.permissions.has(PermissionFlagsBits.Administrator)) {
                return i.reply({ content: '⛔ У вас нет доступа.', flags: [MessageFlags.Ephemeral] });
            }

            const targetCh = i.options.getChannel('target_channel');
            const r1 = i.options.getRole('role1');
            const r2 = i.options.getRole('role2');
            const r3 = i.options.getRole('role3');

            const rolesIds = [r1?.id, r2?.id, r3?.id].filter(id => id);

            const embed = new EmbedBuilder()
                .setTitle('<a:cn_noted:1470526786898235584>  Помощь с сетом')
                .setDescription('Если Вам не хватает аксессуаров/скина/бронежилета для подземной шахты — нажмите на кнопку ниже и заполните форму.')
                .setColor('#FFA500');

            const btn = new ButtonBuilder()
                .setCustomId(`btn_subota_${rolesIds.join(',')}`)
                .setLabel('Оставить заявку')
                .setEmoji('📝')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(btn);

            await targetCh.send({ embeds: [embed], components: [row] });
            await i.reply({ content: `✅ Сообщение отправлено в <#${targetCh.id}>`, flags: [MessageFlags.Ephemeral] });
            return;
        }

        if (i.commandName === 'setup_academy') {
            const embed = new EmbedBuilder()
                .setTitle('🏠 **Академия Семьи**')
                .setDescription('Если ты хочешь стать частью нашей большой семьи, нажми на кнопку ниже и заполни анкету.')
                .setColor('#FF69B4')
                .setThumbnail('https://i.pinimg.com/736x/52/18/e9/5218e9a1fe3cf5c3672bd3f78601cd8b.jpg');

            const btn = new ButtonBuilder()
                .setCustomId('academy_apply')
                .setLabel('Подать заявку')
                .setStyle(ButtonStyle.Success)
                .setEmoji('📝');

            const row = new ActionRowBuilder().addComponents(btn);
            await i.reply({ embeds: [embed], components: [row] });
            return;
        }

        if (i.commandName === 'send_embed') {
            const t1 = i.options.getString('title1');
            const d1 = i.options.getString('desc1');
            const t2 = i.options.getString('title2');
            const d2 = i.options.getString('desc2');
            const img = i.options.getString('image_url');
            const link = i.options.getString('link');
            const lText = i.options.getString('link_text');
            const file = i.options.getAttachment('file');

            const embed = new EmbedBuilder().setColor('#2F3136');
            if (t1 || d1) {
                let text = '';
                if (t1) text += `# ${t1}\n\n`;
                if (d1) text += d1;
                embed.setDescription(text);
            }
            if (t2 || d2) embed.addFields({ name: t2 || '\u200B', value: d2 || '\u200B' });
            if (img) embed.setImage(img);

            const components = [];
            if (link && lText) {
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setLabel(lText).setStyle(ButtonStyle.Link).setURL(link)
                );
                components.push(row);
            }

            const sendOptions = { embeds: [embed], components };
            if (file) sendOptions.files = [file];

            await i.channel.send(sendOptions);
            await i.reply({ content: '✅ Эмбед отправлен!', flags: [MessageFlags.Ephemeral] });
            return;
        }

        if (i.commandName === 'send_script') {
            const file = i.options.getAttachment('file');
            const screenshot = i.options.getAttachment('screenshot');

            scriptCache.set(i.user.id, { file, screenshot });

            const modal = new ModalBuilder()
                .setCustomId('modal_script_desc')
                .setTitle('Описание скрипта');

            const input = new TextInputBuilder()
                .setCustomId('script_desc_text')
                .setLabel('Введите описание обновления')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Например: Пофиксили баги, добавили новые функции...')
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(input));
            await i.showModal(modal);
            return;
        }

        if (i.commandName === 'pay_list') {
            const isAdmin = ADMIN_ROLES.some(r => i.member.roles.cache.has(r)) || i.member.permissions.has(PermissionFlagsBits.Administrator);
            if (!isAdmin) return i.reply({ content: '⛔ Нет доступа.', flags: [MessageFlags.Ephemeral] });

            const embed = new EmbedBuilder()
                .setTitle(`💰 Список оплаты [${new Date().toLocaleDateString('ru-RU')}]`)
                .setDescription('Пока пусто...')
                .setColor('#2F3136');

            await i.reply({ embeds: [embed] });
            const msg = await i.fetchReply();
            lastPayMessageId = msg.id;
            await saveFinkaData();
            return;
        }

        if (i.commandName === 'pay_add') {
            const isAdmin = ADMIN_ROLES.some(r => i.member.roles.cache.has(r)) || i.member.permissions.has(PermissionFlagsBits.Administrator);
            if (!isAdmin) return i.reply({ content: '⛔ Нет доступа.', flags: [MessageFlags.Ephemeral] });

            if (!lastPayMessageId) return i.reply({ content: '❌ Сначала создайте список через `/pay_list`.', flags: [MessageFlags.Ephemeral] });

            const user = i.options.getUser('user');
            const status = i.options.getString('status');

            try {
                const msg = await i.channel.messages.fetch(lastPayMessageId);
                const oldEmbed = msg.embeds[0];
                let currentDesc = oldEmbed.description;
                if (currentDesc === 'Пока пусто...') currentDesc = '';

                const newDesc = currentDesc + `\n${status} | <@${user.id}>`;
                const newEmbed = EmbedBuilder.from(oldEmbed).setDescription(newDesc);

                await msg.edit({ embeds: [newEmbed] });
                await i.reply({ content: `✅ Добавлено: <@${user.id}> - ${status}`, flags: [MessageFlags.Ephemeral] });
            } catch (e) {
                await i.reply({ content: '❌ Ошибка: список не найден в этом канале.', flags: [MessageFlags.Ephemeral] });
            }
            return;
        }

        if (i.commandName === 'clear') {
            const isAdmin = ADMIN_ROLES.some(r => i.member.roles.cache.has(r)) || i.member.permissions.has(PermissionFlagsBits.Administrator);
            if (!isAdmin) return i.reply({ content: '⛔ Нет доступа.', flags: [MessageFlags.Ephemeral] });
            const amount = i.options.getInteger('amount');
            if (amount < 1 || amount > 100) return i.reply({ content: 'Укажите число от 1 до 100.', flags: [MessageFlags.Ephemeral] });
            await i.channel.bulkDelete(amount, true);
            await i.reply({ content: `✅ Удалено ${amount} сообщений.`, flags: [MessageFlags.Ephemeral] });
            return;
        }

        if (i.commandName === 'setup_voice') {
            const isAdmin = ADMIN_ROLES.some(r => i.member.roles.cache.has(r)) || i.member.permissions.has(PermissionFlagsBits.Administrator);
            if (!isAdmin) return i.reply({ content: '⛔ Нет доступа.', flags: [MessageFlags.Ephemeral] });

            voiceTriggerId = i.options.getChannel('channel').id;

            const embed = new EmbedBuilder()
                .setTitle('☁️ Управление приватным каналом')
                .setDescription('Нажмите на кнопки ниже, чтобы настроить свой канал.\n\n' +
                    '👑 — Передать права\n' +
                    '👢 — Кикнуть и забанить\n' +
                    '🔓 — Дать доступ\n' +
                    '🔒 — Забрать доступ\n' +
                    '📝 — Сменить название\n' +
                    '👥 — Сменить лимит')
                .setColor('#2F3136');

            const r1 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('vc_transfer').setEmoji('👑').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('vc_kick').setEmoji('👢').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('vc_permit').setEmoji('🔓').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('vc_reject').setEmoji('🔒').setStyle(ButtonStyle.Secondary)
            );
            const r2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('vc_rename').setEmoji('📝').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('vc_limit').setEmoji('👥').setStyle(ButtonStyle.Secondary)
            );

            await i.reply({ embeds: [embed], components: [r1, r2] });
            return;
        }

        if (i.commandName === 'pic') {
            const amount = i.options.getInteger('amount');
            const text = i.options.getString('text');
            const bText = i.options.getString('button_text');
            const emoji = i.options.getString('emoji');

            const data = createPickEmbed(0, [], amount, text, bText, emoji);
            await i.reply(data);
            const msg = await i.fetchReply();
            lastPicMessageId = msg.id;
            return;
        }

        if (i.commandName === 'clear_pic') {
            const isAdmin = ADMIN_ROLES.some(r => i.member.roles.cache.has(r)) || i.member.permissions.has(PermissionFlagsBits.Administrator);
            if (!isAdmin) return i.reply({ content: '⛔ Нет доступа.', flags: [MessageFlags.Ephemeral] });

            if (!lastPicMessageId) return i.reply({ content: 'Сборы не найдены.', flags: [MessageFlags.Ephemeral] });
            const target = i.options.getUser('user');

            try {
                const msg = await i.channel.messages.fetch(lastPicMessageId);
                const embed = msg.embeds[0];
                const field = embed.fields.find(f => f.name === 'Список участников:');
                
                let users = [];
                if (field.value !== 'Пока никого...') {
                    users = field.value.split('\n').map(line => line.replace(/^\d+\.\s*/, ''));
                }

                const maxSlots = parseInt(msg.components[0].components[0].customId.split('_')[1]);
                
                // Освобождаем слот удаляемого игрока
                const newUsers = users.map(line => line.includes(target.id) ? 'Свободно' : line);
                const usersCount = newUsers.filter(u => u !== 'Свободно').length;
                const finalUsers = usersCount === 0 ? [] : newUsers;

                let label = 'Пик слота';
                let emoji = '⛏️';
                if (embed.description && embed.description.includes('финку')) {
                    label = 'Занять слот';
                    emoji = '💰';
                }

                const newData = createPickEmbed(usersCount, finalUsers, maxSlots, embed.description, label, emoji);
                await msg.edit(newData);
                await i.reply({ content: `✅ <@${target.id}> удален из сбора.`, flags: [MessageFlags.Ephemeral] });
            } catch (e) {
                await i.reply({ content: 'Ошибка при обновлении сбора.', flags: [MessageFlags.Ephemeral] });
            }
            return;
        }
    }

    if (i.isButton()) {

        if (i.customId === 'academy_apply') {
            const modal = new ModalBuilder().setCustomId('academy_modal').setTitle('Заявка в Академию');
            const name = new TextInputBuilder().setCustomId('ac_name').setLabel('Ваше имя').setStyle(TextInputStyle.Short).setRequired(true);
            const age = new TextInputBuilder().setCustomId('ac_age').setLabel('Возвраст').setStyle(TextInputStyle.Short).setRequired(true);
            const nick = new TextInputBuilder().setCustomId('ac_nick').setLabel('Игровой ник (Nick_Name)').setStyle(TextInputStyle.Short).setRequired(true);
            const screen = new TextInputBuilder().setCustomId('ac_screen').setLabel('Ссылка на скриншот /history').setStyle(TextInputStyle.Short).setRequired(true);
            const goal = new TextInputBuilder().setCustomId('ac_goal').setLabel('Почему хотите именно к нам?').setStyle(TextInputStyle.Paragraph).setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(name),
                new ActionRowBuilder().addComponents(age),
                new ActionRowBuilder().addComponents(nick),
                new ActionRowBuilder().addComponents(screen),
                new ActionRowBuilder().addComponents(goal)
            );
            return await i.showModal(modal);
        }

        if (['ac_take', 'ac_deny', 'ac_close'].includes(i.customId) || i.customId.startsWith('ac_call_') || i.customId.startsWith('ac_approve_')) {
            const isAdmin = ADMIN_ROLES.some(r => i.member.roles.cache.has(r)) || i.member.permissions.has(PermissionFlagsBits.Administrator);
            if (!isAdmin) return i.reply({ content: '⛔ Только руководство может это делать.', flags: [MessageFlags.Ephemeral] });

            if (i.customId === 'ac_take') {
                await i.reply({ content: `<@${i.user.id}> взял заявку на рассмотрение.`, allowedMentions: { users: [] } });
                await i.message.edit({ components: [] });
            }
            if (i.customId === 'ac_deny') {
                await i.reply('❌ К сожалению, Вам отказано.');
                await i.channel.setArchived(true);
            }
            if (i.customId === 'ac_close') {
                await i.reply('🔒 Тред закрыт.');
                await i.channel.setArchived(true);
            }
            if (i.customId.startsWith('ac_call_')) {
                const uid = i.customId.split('_')[2];
                await i.reply({ content: `🔔 <@${uid}>, Вас вызывают на обзвон! Зайдите в голосовой канал "Ожидание обзвона".` });
            }
            if (i.customId.startsWith('ac_approve_')) {
                const uid = i.customId.split('_')[2];
                await i.reply(`✅ Поздравляем, <@${uid}>! Вы приняты в академию семьи. Ожидайте инвайт в игре.`);
            }
            return;
        }

        if (i.customId.startsWith('btn_subota_')) {
            const rolesString = i.customId.split('_')[2];
            const allowedRoles = rolesString ? rolesString.split(',') : [];

            const hasAccess = allowedRoles.length === 0 || allowedRoles.some(rId => i.member.roles.cache.has(rId)) || i.member.permissions.has(PermissionFlagsBits.Administrator);

            if (!hasAccess) {
                return i.reply({ content: '⛔ У вас нет подходящей роли для заполнения этой заявки.', flags: [MessageFlags.Ephemeral] });
            }

            const modal = new ModalBuilder().setCustomId('modal_subota').setTitle('Заявка на помощь с сетом');
            const nick = new TextInputBuilder().setCustomId('sub_nick').setLabel('Ваш никнейм').setStyle(TextInputStyle.Short).setRequired(true);
            const slots = new TextInputBuilder().setCustomId('sub_slots').setLabel('Что у вас есть? (Слоты)').setStyle(TextInputStyle.Paragraph).setRequired(true);
            const stats = new TextInputBuilder().setCustomId('sub_stats').setLabel('Ваши текущие статы (Урон/Защита)').setStyle(TextInputStyle.Short).setRequired(true);
            const missing = new TextInputBuilder().setCustomId('sub_missing').setLabel('Чего именно не хватает?').setStyle(TextInputStyle.Paragraph).setRequired(true);
            const screen = new TextInputBuilder().setCustomId('sub_screen').setLabel('Ссылка на скриншот сета/стат').setStyle(TextInputStyle.Short).setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(nick),
                new ActionRowBuilder().addComponents(slots),
                new ActionRowBuilder().addComponents(stats),
                new ActionRowBuilder().addComponents(missing),
                new ActionRowBuilder().addComponents(screen)
            );
            await i.showModal(modal);
            return;
        }

        if (i.customId.startsWith('btnleave_')) {
            const maxSlots = parseInt(i.customId.split('_')[1]);
            const embed = i.message.embeds[0];

            const field = embed.fields.find(f => f.name === 'Список участников:');
            let users = [];
            if (field && field.value !== 'Пока никого...') {
                users = field.value.split('\n').map(line => line.replace(/^\d+\.\s*/, ''));
            }

            const userIndex = users.findIndex(line => line.includes(i.user.id));
            if (userIndex === -1) {
                return i.reply({ content: 'Вы не записаны!', flags: [MessageFlags.Ephemeral] });
            }

            users[userIndex] = 'Свободно';
            const usersCount = users.filter(u => u !== 'Свободно').length;
            const finalUsers = usersCount === 0 ? [] : users;

            let label = 'Пик слота';
            let emoji = '⛏️';
            if (embed.description && embed.description.includes('финку')) {
                label = 'Занять слот';
                emoji = '💰';
            }

            // Устанавливаем КД на 3 минуты (180000 мс)
            leaveCooldowns.set(i.user.id, Date.now() + 180000);

            const newData = createPickEmbed(usersCount, finalUsers, maxSlots, embed.description, label, emoji);
            await i.message.edit(newData);
            await i.reply({ content: `Вы успешно покинули слот #${userIndex + 1}. Повторная запись доступна через 3 минуты.`, flags: [MessageFlags.Ephemeral] });
            return;
        } else if (i.customId.startsWith('btn_')) {
            // Проверка КД
            const cooldown = leaveCooldowns.get(i.user.id);
            if (cooldown && cooldown > Date.now()) {
                const timeLeft = Math.ceil((cooldown - Date.now()) / 1000);
                return i.reply({ content: `Вы недавно вышли из сбора. Подождите еще ${timeLeft} сек.`, flags: [MessageFlags.Ephemeral] });
            }

            const maxSlots = parseInt(i.customId.split('_')[1]);
            const embed = i.message.embeds[0];
            
            if (embed.description && embed.description.includes('финку')) {
                const hasAccess = FINKA_ALLOWED_ROLES.some(rId => i.member.roles.cache.has(rId)) || i.member.permissions.has(PermissionFlagsBits.Administrator);
                if (!hasAccess) {
                    return i.reply({ content: '⛔ У вас нет доступа к этому сбору.', flags: [MessageFlags.Ephemeral] });
                }
            }

            const field = embed.fields.find(f => f.name === 'Список участников:');
            let users = [];
            if (field.value !== 'Пока никого...') {
                users = field.value.split('\n').map(line => line.replace(/^\d+\.\s*/, ''));
            }

            // Дополняем массив до количества слотов
            while (users.length < maxSlots) {
                users.push('Свободно');
            }

            if (users.some(line => line.includes(i.user.id))) {
                return i.reply({ content: 'Вы уже записаны!', flags: [MessageFlags.Ephemeral] });
            }

            // Поиск доступных слотов
            let availableIndexes = [];
            users.forEach((u, idx) => {
                if (u === 'Свободно') availableIndexes.push(idx);
            });

            if (availableIndexes.length === 0) {
                return i.reply({ content: 'Все места заняты!', flags: [MessageFlags.Ephemeral] });
            }

            // Выбор случайного слота
            const randomIdx = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
            users[randomIdx] = `<@${i.user.id}>`;

            const usersCount = users.filter(u => u !== 'Свободно').length;
            
            let label = 'Пик слота';
            let emoji = '⛏️';
            if (embed.description && embed.description.includes('финку')) {
                label = 'Занять слот';
                emoji = '💰';
            }

            const newData = createPickEmbed(usersCount, users, maxSlots, embed.description, label, emoji);
            await i.message.edit(newData);
            await i.reply({ content: `Вы успешно заняли слот #${randomIdx + 1}!`, flags: [MessageFlags.Ephemeral] });
            return;
        }

        if (i.customId.startsWith('vc_')) {
            const ownerId = privateVoices.get(i.channel.id);
            if (ownerId !== i.user.id && !i.member.permissions.has(PermissionFlagsBits.Administrator)) {
                return i.reply({ content: 'Вы не владелец этого канала!', flags: [MessageFlags.Ephemeral] });
            }

            if (i.customId === 'vc_rename') {
                const modal = new ModalBuilder().setCustomId('rn').setTitle('Смена названия');
                const input = new TextInputBuilder().setCustomId('n').setLabel('Название').setStyle(TextInputStyle.Short).setRequired(true);
                modal.addComponents(new ActionRowBuilder().addComponents(input));
                await i.showModal(modal);
            } else if (i.customId === 'vc_limit') {
                const modal = new ModalBuilder().setCustomId('ml').setTitle('Смена лимита');
                const input = new TextInputBuilder().setCustomId('v').setLabel('Лимит (0 - без лимита)').setStyle(TextInputStyle.Short).setRequired(true);
                modal.addComponents(new ActionRowBuilder().addComponents(input));
                await i.showModal(modal);
            } else {
                let placeholder = 'Выберите пользователя';
                let selectId = '';

                if (i.customId === 'vc_transfer') { selectId = 'sel_transfer'; placeholder = 'Кому передать права?'; }
                if (i.customId === 'vc_kick') { selectId = 'sel_kick'; placeholder = 'Кого кикнуть и забанить?'; }
                if (i.customId === 'vc_permit') { selectId = 'sel_permit'; placeholder = 'Кому дать доступ?'; }
                if (i.customId === 'vc_reject') { selectId = 'sel_reject'; placeholder = 'У кого забрать доступ?'; }

                const select = new UserSelectMenuBuilder()
                    .setCustomId(selectId)
                    .setPlaceholder(placeholder);

                const row = new ActionRowBuilder().addComponents(select);
                await i.reply({ components: [row], flags: [MessageFlags.Ephemeral] });
            }
        }
    }
});

client.on(Events.GuildMemberAdd, async (m) => {
    if (!ALLOWED_GUILDS.includes(m.guild.id)) return;
    const role = m.guild.roles.cache.get(AUTO_ROLE_ID);
    if (role) await m.roles.add(role).catch(() => {});
    const welcome = m.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (welcome) {
        const emb = new EmbedBuilder().setDescription(`**Дарова, <@${m.id}> залетай в войс** <:3221sparkles:1462803728687169606>`).setColor('#FF69B4');
        await welcome.send({ content: `<@${m.id}>`, embeds: [emb] });
    }
});

client.on(Events.InteractionCreate, async (i) => {
    if (!i.isUserSelectMenu()) return;
    const ownerId = privateVoices.get(i.channel.id);
    if (ownerId !== i.user.id && !i.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return i.reply({ content: 'Нет доступа.', flags: [MessageFlags.Ephemeral] });
    }

    const target = i.members.first();
    if (!target) return;

    if (i.customId === 'sel_transfer') {
        privateVoices.set(i.channel.id, target.id);
        await i.reply({ content: `Права переданы <@${target.id}>`, flags: [MessageFlags.Ephemeral] });
    } else if (i.customId === 'sel_kick') {
        await i.channel.permissionOverwrites.create(target, { Connect: false });
        if (target.voice.channelId === i.channel.id) await target.voice.disconnect();
        await i.reply({ content: `<@${target.id}> забанен в канале.`, flags: [MessageFlags.Ephemeral] });
    } else if (i.customId === 'sel_permit') {
        await i.channel.permissionOverwrites.create(target, { Connect: true, Speak: true });
        await i.reply({ content: `<@${target.id}> получил доступ.`, flags: [MessageFlags.Ephemeral] });
    } else if (i.customId === 'sel_reject') {
        await i.channel.permissionOverwrites.delete(target);
        if (target.voice.channelId === i.channel.id) await target.voice.disconnect();
        await i.reply({ content: `Доступ у <@${target.id}> отозван.`, flags: [MessageFlags.Ephemeral] });
    }
});

client.on(Events.InteractionCreate, async (i) => {
    if (!i.isModalSubmit()) return;
    if (i.customId === 'rn') {
        const ownerId = privateVoices.get(i.channel.id);
        if (ownerId !== i.user.id && !i.member.permissions.has(PermissionFlagsBits.Administrator)) return;
        const name = i.fields.getTextInputValue('n');
        await i.channel.setName(`☁️ ${name}`);
        await i.reply({ content: `Название изменено на: ${name}`, flags: [MessageFlags.Ephemeral] });
    }
});

client.login(process.env.TOKEN);
