const checkHealth = async (req, res) => {
    res.status(200).json({
        app: 'okk'
    });
    const now = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
    });
    console.log("CRON HITT:", now);
}

export { checkHealth };
