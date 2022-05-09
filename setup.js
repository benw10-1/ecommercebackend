const fs = require("fs")
const seedAll = require("./seeds/index")
const db = require("./config/sq")

function arrayify(q) {
    return q.replace(/--.*$/mg, "").replace(/[\r\n]/g, "").split(";").filter(x => x !== "").map(x => x + ";")
}

function makeq(q) {
    return new Promise((res) => {
        db.query(q, _ => res(`Success!: ${q}`))
    })
}

function main() {
    const toprocess = arrayify(fs.readFileSync("db/schema.sql").toString())
    db.connect(async _ => {
        for (const x of toprocess) await makeq(x).then(x => console.log(x))

        await seedAll()

        db.destroy()

        process.exit(0)
    })
}

main()