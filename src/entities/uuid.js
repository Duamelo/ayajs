class _uuid
{
    static generate()
    {
        return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
}
export {_uuid};