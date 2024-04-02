import { isPositive } from "./main";



describe('isPositive', () => { 
    it('should return true when n > 0', () => {
        expect(isPositive(1)).toBe(true)
        expect(isPositive(1)).toBe(true)
        expect(isPositive(1)).toBe(true)
    })

    it('should return false when n = 0', () => {
        expect(isPositive(0)).toBe(false)
    })

    it('should return false when n < 0', () => {
        expect(isPositive(-5)).toBe(false)
    })
 })