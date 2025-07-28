import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

export default function ShowContactDialog({showContactInfoDialog, setShowContactInfoDialog}) {
  return (
    <Dialog open={showContactInfoDialog} onOpenChange={setShowContactInfoDialog}>
    <DialogContent>
        <DialogHeader>
          <DialogTitle>Buyurtmani bekor qilish uchun bog&#39;laning</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-700">
        Bergan buyurtmangizni bekor qilsh uchun biz bilan bog&#39;laning
        </p>
        <p className="text-lg font-semibold mt-2">+998 (90) 305-77-83</p>
        <p className="text-sm text-gray-600 mt-1">Buyurtmangiz hozircha bekor qilnmaydi</p>
        <div className="mt-4 flex justify-end">
          <button onClick={() => setShowContactInfoDialog(false)} className="bg-green-600 text-white px-4 py-2 rounded">Yopish</button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
