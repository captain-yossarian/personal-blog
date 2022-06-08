import { Option, fromNullable } from "fp-ts/Option";
import { Either, tryCatch } from 'fp-ts/Either'
import { IO } from 'fp-ts/IO'
import { Task } from 'fp-ts/Task'
import { TaskEither, tryCatch as tryCatch2 } from 'fp-ts/TaskEither'
import { Eq, struct } from "fp-ts/lib/Eq";
import { getStructEq } from 'fp-ts/Eq'
import { getEq } from 'fp-ts/Array'
import { contramap } from 'fp-ts/Eq'

const find = <A>(as: Array<A>, predicate: (a: A) => boolean): Option<A> =>
    fromNullable(as.find(predicate))

const result = find([1, 2, 3], (elem) => elem === 5)

const parse = (s: string): Either<Error, unknown> =>
    tryCatch(
        () => JSON.parse(s),
        (reason) => new Error(String(reason))
    )



function get(url: string): TaskEither<Error, string> {
    return tryCatch2(
        () => fetch(url).then((res) => res.text()),
        (reason) => new Error(String(reason))
    )
}

function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
    return (a, as) => as.some(item => E.equals(item, a))
}

const eqNumber: Eq<number> = {
    equals: (x, y) => x === y
}

elem(eqNumber)(1, [1, 2, 3]) // true
elem(eqNumber)(4, [1, 2, 3]) // false

type Point = {
    x: number
    y: number
}

const eqPoint: Eq<Point> = struct({
    x: eqNumber,
    y: eqNumber
})
const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPoint)


type User = {
    userId: number
    name: string
}

/** two users are equal if their `userId` field is equal */
const eqUser = contramap((user: User) => user.userId)(eqNumber)

eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 1, name: 'Giulio Canti2' }) // true
eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 2, name: 'Giulio' }) // false

export const log = () => console.log(1)