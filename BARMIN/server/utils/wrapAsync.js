const wrapAsync = (func) => {
    return (req, res, nex) => {
        func(req, res, next).catch(next);
    }
}

export default wrapAsync;