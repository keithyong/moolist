export default function pgErrHandler(res, err) {
    res.status(500)
    res.send(err)
}
