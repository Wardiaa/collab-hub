import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ShareModal = ({ file, onClose, onShare }) => {
  const [email, setEmail] = useState('');
  const [accessLevel, setAccessLevel] = useState('view');
  const [expirationDays, setExpirationDays] = useState('never');
  const [sharedWith, setSharedWith] = useState([
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@collabhub.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png",
    avatarAlt: 'Professional headshot of Asian woman with long black hair in white blouse',
    accessLevel: 'edit',
    addedAt: new Date(Date.now() - 86400000)
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    email: 'michael.r@collabhub.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_143b978a3-1763294952544.png",
    avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit',
    accessLevel: 'view',
    addedAt: new Date(Date.now() - 172800000)
  }]
  );

  const accessOptions = [
  { value: 'view', label: 'Can View', description: 'Can only view and download' },
  { value: 'comment', label: 'Can Comment', description: 'Can view and add comments' },
  { value: 'edit', label: 'Can Edit', description: 'Can view, comment, and edit' }];


  const expirationOptions = [
  { value: 'never', label: 'Never' },
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' }];


  const handleAddUser = () => {
    if (email) {
      const newUser = {
        id: Date.now(),
        name: email?.split('@')?.[0],
        email: email,
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12e787df4-1764869749812.png",
        avatarAlt: 'Default user avatar placeholder with neutral background',
        accessLevel: accessLevel,
        addedAt: new Date()
      };
      setSharedWith([...sharedWith, newUser]);
      setEmail('');
      setAccessLevel('view');
    }
  };

  const handleRemoveUser = (userId) => {
    setSharedWith(sharedWith?.filter((user) => user?.id !== userId));
  };

  const handleChangeAccess = (userId, newAccess) => {
    setSharedWith(sharedWith?.map((user) =>
    user?.id === userId ? { ...user, accessLevel: newAccess } : user
    ));
  };

  const copyShareLink = () => {
    const link = `https://collabhub.com/files/${file?.id}`;
    navigator.clipboard?.writeText(link);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1400 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-warm-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Icon name="Share2" size={24} className="text-primary" />
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">Share File</h2>
              <p className="text-sm text-muted-foreground line-clamp-1">{file?.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Close share modal">

            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Add People */}
          <div className="mb-6">
            <label className="block text-sm font-caption font-medium text-foreground mb-3">
              Add People
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)} />

              </div>
              <div className="w-full sm:w-40">
                <Select
                  options={accessOptions}
                  value={accessLevel}
                  onChange={setAccessLevel}
                  placeholder="Access level" />

              </div>
              <Button
                variant="default"
                iconName="UserPlus"
                onClick={handleAddUser}
                className="w-full sm:w-auto">

                Add
              </Button>
            </div>
          </div>

          {/* Shared With */}
          <div className="mb-6">
            <label className="block text-sm font-caption font-medium text-foreground mb-3">
              Shared With ({sharedWith?.length})
            </label>
            <div className="space-y-2">
              {sharedWith?.map((user) =>
              <div
                key={user?.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg">

                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                      <Image
                      src={user?.avatar}
                      alt={user?.avatarAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-caption font-medium text-foreground line-clamp-1">
                        {user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <select
                    value={user?.accessLevel}
                    onChange={(e) => handleChangeAccess(user?.id, e?.target?.value)}
                    className="px-3 py-1.5 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">

                      <option value="view">Can View</option>
                      <option value="comment">Can Comment</option>
                      <option value="edit">Can Edit</option>
                    </select>
                    <button
                    onClick={() => handleRemoveUser(user?.id)}
                    className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-smooth"
                    aria-label="Remove user">

                      <Icon name="X" size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Link Sharing */}
          <div className="mb-6">
            <label className="block text-sm font-caption font-medium text-foreground mb-3">
              Share Link
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  value={`https://collabhub.com/files/${file?.id}`}
                  readOnly />

              </div>
              <Button
                variant="outline"
                iconName="Copy"
                onClick={copyShareLink}
                className="w-full sm:w-auto">

                Copy Link
              </Button>
            </div>
          </div>

          {/* Expiration */}
          <div>
            <label className="block text-sm font-caption font-medium text-foreground mb-3">
              Link Expiration
            </label>
            <Select
              options={expirationOptions}
              value={expirationDays}
              onChange={setExpirationDays}
              placeholder="Select expiration" />

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={() => onShare(sharedWith)}>
            Done
          </Button>
        </div>
      </div>
    </div>);

};

export default ShareModal;