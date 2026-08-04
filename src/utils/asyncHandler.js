const asyncHandler = (requestHandler) => {
    return (req, res ,next) => {
        Promise.resolve.catch(requestHandler(req, res ,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}